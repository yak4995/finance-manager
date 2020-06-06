import TransactionCategoryOutputPort from '../../../../core/app/transactions/ports/transactionCategoryOutput.port';
import ITransactionCategory from '../../../../core/domain/transactions/entities/transactionCategory.interface';
import { Logger } from '@nestjs/common';

export default class DefTransactionCategoryOutputPort
  implements TransactionCategoryOutputPort {
  async getTopCategories(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result.map((tc: ITransactionCategory) => {
      const { owner, parentCategory, ...res } = tc;
      return res as ITransactionCategory;
    });
  }

  async getCategoryDirectChildren(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result.map((tc: ITransactionCategory) => {
      const { owner, parentCategory, ...res } = tc;
      return res as ITransactionCategory;
    });
  }

  async getOwnCategories(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result.map((tc: ITransactionCategory) => {
      const { owner, parentCategory, ...res } = tc;
      return res as ITransactionCategory;
    });
  }

  async search(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result.map((tc: ITransactionCategory) => {
      const { owner, parentCategory, ...res } = tc;
      return res as ITransactionCategory;
    });
  }

  async addCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<ITransactionCategory> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result;
  }

  async updateCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<ITransactionCategory> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return result;
  }

  async deleteCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<boolean> {
    if (e) {
      Logger.error(e.message, e.stack, 'DefAuthorityOutputPort::processLogin');
      throw e;
    }
    return true;
  }
}
