import { Sequelize } from 'sequelize';
import * as Config from '../../../presentation/config.json';
import { Logger } from '../../../application/commons/core/logger';
import { Context } from './db.context';

// Mappings
import { LogDAO } from '../../../domain/entities/log.entity';
import { ProductDAO } from '../../../domain/entities/product.entity';
import { CategoryDAO } from '../../../domain/entities/category.entity';
import { UserDAO } from '../../../domain/entities/user.entity';
import { PointDAO } from '../../../domain/entities/point.entity';
import { DonationDAO } from '../../../domain/entities/donation.entity';
import { RankDAO } from '../../../domain/entities/rank.entity';
import { AddressDAO } from '../../../domain/entities/address.entity';
import { LogService } from '../../../application/services/log.service';
import { LogRepository } from '../repositories/log.repository';
import { HttpCode } from '../../../application/commons/enums/httpCode';
import { Mapper } from '@nartc/automapper';

const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;
const _instance = Context.getInstance();

interface PersistenceModel {
  name: string;
  entity: Sequelize
}

export class Persistence {
  
  private readonly _log: LogService;

  constructor() {
    this._log = new LogService(new LogRepository(), Mapper);
  }

  public Build() {
    // The order influences creation in the database!
    const models: PersistenceModel[] = [
      { name: 'Category', entity: CategoryDAO.sequelize },
      { name: 'Product', entity: ProductDAO.sequelize },
      { name: 'Log', entity: LogDAO.sequelize },
      { name: 'User', entity: UserDAO.sequelize },
      { name: 'Point', entity: PointDAO.sequelize },
      { name: 'Donation', entity: DonationDAO.sequelize },
      { name: 'Rank', entity: RankDAO.sequelize },
      { name: 'Address', entity: AddressDAO.sequelize },
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N - belongs to many

    // 1:N - has many
    CategoryDAO.hasMany(ProductDAO, { foreignKey: 'categoryId', as: 'products' });
    CategoryDAO.hasMany(DonationDAO, { foreignKey: 'categoryId', as: 'donations' });
    UserDAO.hasMany(PointDAO, { foreignKey: 'userId', as: 'points' });
    UserDAO.hasMany(DonationDAO, { foreignKey: 'userId', as: 'donations' });

    // N:1 - belongs to
    ProductDAO.belongsTo(CategoryDAO, { as: 'category' });
    PointDAO.belongsTo(UserDAO, { as: 'user' });
    DonationDAO.belongsTo(UserDAO, { as: 'user' });
    DonationDAO.belongsTo(CategoryDAO, { as: 'category' });
    AddressDAO.belongsTo(UserDAO, { as: 'user' });

    // 1:1 - has one
    UserDAO.hasOne(AddressDAO, { foreignKey: 'userId', as: 'address' });

    /* #endregion */
    this.checkAndBuild(models)
      .catch((error: any) => {
        if (error.toString().indexOf('ETIMEDOUT') != -1) {
          this._log.warn('Database', HttpCode.Not_Applicable, 'trying to connect to the database again!', error);
          this.checkAndBuild(models);
        }
      });
  }

  /* #region  Checking and Build the Database */

  private checkAndBuild(models: PersistenceModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      _instance.authenticate({ logging: (IsLogger ? msg => this._log.info('Authenticate', HttpCode.Not_Applicable, msg, undefined) : IsLogger) })
        .then(() => {
          this._log.info('Database', HttpCode.Not_Applicable, 'Connection established successfully!', undefined);
          this.CreateTables(models)
            .then(result => {
              this._log.info('Database', HttpCode.Not_Applicable, `Table verification ${result}!`, undefined);
              resolve(true);
            });
        })
        .catch(error => {
          this._log.error('Database', HttpCode.Not_Applicable, 'Error when trying to connect to the database!', undefined);
          this._log.error('Database', HttpCode.Not_Applicable, '', error);
          reject(error);
        });
    });
  }

  private async CreateTables(models: { name: string, entity: Sequelize }[], count = 0, success = 0, errors = 0, total = 0) {
    return new Promise(async (resolve) => {
      const modelsWithErrors = [];

      if (DropAllTable) {
        await this.DropAllTables(models);
      }

      if (total < models.length) {
        models[count].entity.sync(
          {
            force: ForceSync,
            alter: AlterSync,
            logging: (IsLogger ? msg => this._log.info(models[count].name, HttpCode.Not_Applicable, msg, undefined) : IsLogger)
          })
          .then(() => {
            this._log.info(models[count].name, HttpCode.Not_Applicable, 'verification finished!', undefined);
            success++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          })
          .catch(error => {
            this._log.error(models[count].name, HttpCode.Not_Applicable, '', error);
            modelsWithErrors.push(models[count]);
            errors++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          });
      } else {
        this._log.info('Database', HttpCode.Not_Applicable, `verification result => Sucess: ${success} | Errors: ${errors} | Total: ${models.length}`, undefined);

        if (errors > 0) {
          this._log.error('Database', HttpCode.Not_Applicable, `${errors} errors in the models were found!`, undefined);
          this._log.warn('Database', HttpCode.Not_Applicable, 'trying to fix the models', undefined);
          await this.TryFixModels(modelsWithErrors, resolve);
        } else {
          resolve('finished successfully');
        }
      }
    });
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void, count = 0, attempts = 0, sucess = 0, errors = 0) {
    if (attempts < modelsWithErrors.length) {
      modelsWithErrors[count].entity.sync(
        {
          alter: AlterSync,
          logging: IsLogger ? msg => this._log.info(modelsWithErrors[count].name, HttpCode.Not_Applicable, msg, undefined) : IsLogger
        })
        .then(() => {
          this._log.info(modelsWithErrors[count].name, HttpCode.Not_Applicable, 'correction completed!', undefined);
          sucess++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        })
        .catch(error => {
          this._log.error(modelsWithErrors[count].name, HttpCode.Not_Applicable, '', error);
          errors++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        });
    } else {
      this._log.info('Database', HttpCode.Not_Applicable, `correction attempts => Sucess: ${sucess} | Errors: ${errors} | Total: ${attempts}`, undefined);
      if (errors > 0) {
        resolve('finished with errors');
      }
      else {
        resolve('finished successfully and corrected the errors');
      }
    }
  }

  private async DropAllTables(models: { name: string; entity: Sequelize; }[]) {
    const queryInterface = models[0].entity.getQueryInterface();
    await queryInterface.dropAllTables()
      .then(() => {
        this._log.warn('Database', HttpCode.Not_Applicable, 'drop all the table finished!', undefined);
      }).catch(error => {
        this._log.error('Database', HttpCode.Not_Applicable, '', error);
      });
  }
  /* #endregion */
}