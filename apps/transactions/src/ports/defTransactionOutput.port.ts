import TransactionOutputPort from '@app/transactions/ports/transactionOutput.port';

import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';
import ITransaction from '@domain/transactions/entities/transaction.interface';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DefTransactionOutputPort implements TransactionOutputPort {
  async getTransactionDetail(result: ITransaction, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactions(result: ITransaction[], e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionsByCategory(
    result: ITransaction[],
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async search(result: ITransaction[], e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async addTransaction(result: ITransaction, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async updateTransaction(
    result: ITransaction,
    e: Error,
  ): Promise<ITransaction> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async deleteTransaction(transaction: ITransaction, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return transaction;
  }

  async getMaxTransactionByCategory(
    result: ITransaction,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getMinTransactionByCategory(
    result: ITransaction,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionsCountBy(result: number, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionsSumBy(result: number, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionsCount(result: number, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionsSum(result: number, e: Error): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }
}
