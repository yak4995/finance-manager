import TransactionCategoryOutputPort from '../transactions/ports/transactionCategoryOutput.port';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';

export default class FakeTransactionCategoryOutputPort
  implements TransactionCategoryOutputPort {
  async getTopCategories(
    result: ITransactionCategory[],
  ): Promise<ITransactionCategory[]> {
    return result;
  }

  async getCategoryDirectChildren(
    result: ITransactionCategory[],
  ): Promise<ITransactionCategory[]> {
    return result;
  }

  async getOwnCategories(
    result: ITransactionCategory[],
  ): Promise<ITransactionCategory[]> {
    return result;
  }

  async search(
    result: ITransactionCategory[],
  ): Promise<ITransactionCategory[]> {
    return result;
  }

  async addCategory(
    result: ITransactionCategory,
  ): Promise<ITransactionCategory> {
    return result;
  }

  async updateCategory(
    result: ITransactionCategory,
  ): Promise<ITransactionCategory> {
    return result;
  }

  async deleteCategory(
    category: ITransactionCategory,
  ): Promise<ITransactionCategory> {
    return category;
  }
}
