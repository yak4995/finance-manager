import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';

export default interface TransactionCategoryOutputPort {
  getTopCategories(result: ITransactionCategory[]): Promise<void>;
  getCategoryDirectChildren(result: ITransactionCategory[]): Promise<void>;
  getOwnCategories(result: ITransactionCategory[]): Promise<void>;
  search(result: ITransactionCategory[]): Promise<void>;
  addCategory(result: ITransactionCategory): Promise<void>;
  updateCategory(result: ITransactionCategory): Promise<void>;
  deleteCategory(category: ITransactionCategory): Promise<void>;
}
