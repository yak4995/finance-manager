import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';

export default interface TransactionCategoryOutputPort {
  getTopCategories(result: ITransactionCategory[], e: Error): Promise<any>;
  getCategoryDirectChildren(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<any>;
  getOwnCategories(result: ITransactionCategory[], e: Error): Promise<any>;
  search(result: ITransactionCategory[], e: Error): Promise<any>;
  addCategory(result: ITransactionCategory, e: Error): Promise<any>;
  updateCategory(result: any, e: Error): Promise<any>;
  deleteCategory(category: ITransactionCategory, e: Error): Promise<any>;
}
