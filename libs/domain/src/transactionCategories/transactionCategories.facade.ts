import ITransactionCategory from './entities/transactionCategory.interface';

export default interface ITransactionCategoriesFacade {
  getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
    metadata?: any,
  ): Promise<any>;
  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
    metadata?: any,
  ): Promise<any>;
  findById(id: any, metadata?: any): Promise<ITransactionCategory>;
}
