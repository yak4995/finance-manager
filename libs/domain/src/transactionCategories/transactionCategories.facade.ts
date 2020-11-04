import ITransactionCategory from './entities/transactionCategory.interface';

export default interface ITransactionCategoriesFacade {
  getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
  ): Promise<any>;
  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<any>;
  findById(id: any): Promise<ITransactionCategory>;
}
