import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';

export default interface TransactionCategoryOutputPort {
  getTopCategories(result: ITransactionCategory[]): Promise<any>;
  getCategoryDirectChildren(result: ITransactionCategory[]): Promise<any>;
  getOwnCategories(result: ITransactionCategory[]): Promise<any>;
  search(result: ITransactionCategory[]): Promise<any>;
  addCategory(result: ITransactionCategory): Promise<any>;
  updateCategory(result: any): Promise<any>;
  deleteCategory(category: ITransactionCategory): Promise<any>;
}
