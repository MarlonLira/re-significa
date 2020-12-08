import { inject, injectable } from "inversify";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/category-repository.interface";
import { TYPES } from "../../infrastructure/crosscutting/ioc/types";
import { InnerException } from "../commons/core/innerException";
import { HttpCode } from "../commons/enums/httpCode";
import { HttpMessage } from "../commons/enums/httpMessage";
import { TransactionType } from "../commons/enums/transactionType";
import { ICategoryService } from "../interfaces/category-service.interface";
import { ILogService } from "../interfaces/log-service.interface";
import { IMapper } from "../interfaces/mapper.interface";
import { CategoryModel } from "../models/category.model";

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.ICategoryRepository) private repository: ICategoryRepository,
    @inject(TYPES.IMapper) private mapper: IMapper,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  save(item: CategoryModel): Promise<CategoryModel> {
    return new Promise((resolve, reject) => {
      item.status = TransactionType.ACTIVE;
      this.repository.save(this.mapper.map(item, CategoryEntity))
        .then((result) => resolve(this.mapper.map(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Category', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(entity: CategoryModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(this.mapper.map(entity, CategoryEntity, CategoryModel))
        .then((result) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Category', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<CategoryModel> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result) => resolve(this.mapper.map(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Category', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Category', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  toList(): Promise<CategoryModel[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: CategoryEntity[]) => resolve(this.mapper.mapArray(result, CategoryModel, CategoryEntity)))
        .catch(async (error: any) =>
          reject(await this.log.critical('Category', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}