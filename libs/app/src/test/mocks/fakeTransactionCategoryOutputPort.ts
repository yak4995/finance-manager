import ITransactionCategory from '../../../../domain/src/transactionCategories/entities/transactionCategory.interface';

import TransactionCategoryOutputPort from '../../transactionCategories/ports/transactionCategoryOutput.port';

/* istanbul ignore next */
export default class FakeTransactionCategoryOutputPort
  implements TransactionCategoryOutputPort {
  async getTopCategories(
    result: ITransactionCategory[],
    e: Error = null,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getCategoryDirectChildren(
    result: ITransactionCategory[],
    e: Error = null,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getOwnCategories(
    result: ITransactionCategory[],
    e: Error = null,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async search(
    result: ITransactionCategory[],
    e: Error = null,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async addCategory(
    result: ITransactionCategory,
    e: Error = null,
  ): Promise<ITransactionCategory> {
    if (e) {
      throw e;
    }
    return result;
  }

  async updateCategory(
    result: ITransactionCategory,
    e: Error = null,
  ): Promise<ITransactionCategory> {
    if (e) {
      throw e;
    }
    return result;
  }

  async deleteCategory(
    category: ITransactionCategory,
    e: Error = null,
  ): Promise<ITransactionCategory> {
    if (e) {
      throw e;
    }
    return category;
  }
}
