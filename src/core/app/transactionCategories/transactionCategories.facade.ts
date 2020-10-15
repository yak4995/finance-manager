import ITransactionCategory from '../../domain/transactionCategories/entities/transactionCategory.interface';

export default interface ITransactionCategoriesFacade {
  getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]>;
  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]>;
  findById(id: string): Promise<ITransactionCategory>;
}
