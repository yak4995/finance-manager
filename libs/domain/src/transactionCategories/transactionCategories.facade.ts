import { Metadata } from 'grpc';
import ITransactionCategory from './entities/transactionCategory.interface';

export default interface ITransactionCategoriesFacade {
  getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
    metadata?: Metadata,
  ): Promise<any>;
  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
    metadata?: Metadata,
  ): Promise<any>;
  findById(id: any, metadata?: Metadata): Promise<ITransactionCategory>;
}
