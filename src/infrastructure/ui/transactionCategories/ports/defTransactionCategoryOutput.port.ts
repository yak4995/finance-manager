import { FileLoggerService } from '../../../transport/logger/fileLogger.service';
import TransactionCategoryOutputPort from '../../../../core/app/transactions/ports/transactionCategoryOutput.port';
import ITransactionCategory from '../../../../core/domain/transactions/entities/transactionCategory.interface';

export default class DefTransactionCategoryOutputPort
  implements TransactionCategoryOutputPort {
  async getTopCategories(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::getTopCategories',
      );
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::getCategoryDirectChildren',
      );
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::getOwnCategories',
      );
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::search',
      );
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::addCategory',
      );
      throw e;
    }
    return result;
  }

  async updateCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<ITransactionCategory> {
    if (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::updateCategory',
      );
      throw e;
    }
    return result;
  }

  async deleteCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<boolean> {
    if (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefTransactionCategoryOutputPort::deleteCategory',
      );
      throw e;
    }
    return true;
  }
}
