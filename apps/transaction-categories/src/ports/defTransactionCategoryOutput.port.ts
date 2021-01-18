import TransactionCategoryOutputPort from '@app/transactionCategories/ports/transactionCategoryOutput.port';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';

import {
  INTERNAL_SERVER_ERROR_MSG,
  IS_OUTCOME_FLAG_ERROR_MSG,
  OWN_CATEGORY_PARENT_ERROR_MSG,
} from '@common/constants/errorMessages.constants';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as cls from 'cls-hooked';

export default class DefTransactionCategoryOutputPort
  implements TransactionCategoryOutputPort {
  async getTopCategories(
    result: ITransactionCategory[],
    e: Error,
  ): Promise<ITransactionCategory[]> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::getTopCategories',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
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
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::getCategoryDirectChildren',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
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
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::getOwnCategories',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
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
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::search',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
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
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::addCategory',
      );
      const errorMessage = e.message;
      if (
        [OWN_CATEGORY_PARENT_ERROR_MSG, IS_OUTCOME_FLAG_ERROR_MSG].includes(
          errorMessage,
        )
      ) {
        throw new BadRequestException(errorMessage);
      }
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }
    return result;
  }

  async updateCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<ITransactionCategory> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::updateCategory',
      );
      if (e.message === IS_OUTCOME_FLAG_ERROR_MSG) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }
    return result;
  }

  async deleteCategory(
    result: ITransactionCategory,
    e: Error,
  ): Promise<boolean> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionCategoryOutputPort::deleteCategory',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }
    return true;
  }
}
