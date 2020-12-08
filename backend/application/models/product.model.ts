import { AutoMap } from "@nartc/automapper";
import { TransactionType } from "../commons/enums/transactionType";
import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";

export class ProductModel extends BaseModel {
  @AutoMap()
  public status: TransactionType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public barCode: string;

  @AutoMap()
  public value: number;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public categoryId: number;

  @AutoMap()
  public category: CategoryModel;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = json.status;
      this.name = json.name;
      this.value = json.value;
      this.amount = json.amount;
      this.categoryId = json.categoryId;
      this.category = json.category;
    }
  }
}