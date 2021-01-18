import TransactionOutputPort from '@app/transactions/ports/transactionOutput.port';

import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';
import ITransaction from '@domain/transactions/entities/transaction.interface';

import { INTERNAL_SERVER_ERROR_MSG } from '@common/constants/errorMessages.constants';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as cls from 'cls-hooked';

@Injectable()
export class DefTransactionOutputPort implements TransactionOutputPort {
  async getTransactionDetail(result: ITransaction, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionDetail',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactions(result: ITransaction[], e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactions',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionsByCategory(
    result: ITransaction[],
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionsByCategory',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async search(result: ITransaction[], e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::search',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async addTransaction(result: ITransaction, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::addTransaction',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async updateTransaction(
    result: ITransaction,
    e: Error,
  ): Promise<ITransaction> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::updateTransaction',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async deleteTransaction(transaction: ITransaction, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::deleteTransaction',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return transaction;
  }

  async getMaxTransactionByCategory(
    result: ITransaction,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getMaxTransactionByCategory',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getMinTransactionByCategory(
    result: ITransaction,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getMinTransactionByCategory',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionsCountBy(result: number, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionsCountBy',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionsSumBy(result: number, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionsSumBy',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionsCount(result: number, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionsCount',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionsSum(result: number, e: Error): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionsSum',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionCountRatioByCategories',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionSumRatioByCategories',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionCountChangeByPeriod',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefTransactionOutputPort::getTransactionSumChangeByPeriod',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }
}
