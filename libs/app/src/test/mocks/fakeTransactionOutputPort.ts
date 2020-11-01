import { TransactionsComparisonDto } from '../../../../domain/src/transactions/dto/transactionsComparison.dto';
import ITransaction from '../../../../domain/src/transactions/entities/transaction.interface';

import TransactionOutputPort from '../../transactions/ports/transactionOutput.port';

/* istanbul ignore next */
export default class FakeTransactionOutputPort
  implements TransactionOutputPort {
  async getTransactionDetail(
    result: ITransaction,
    e: Error = null,
  ): Promise<ITransaction> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactions(
    result: ITransaction[],
    e: Error = null,
  ): Promise<ITransaction[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionsByCategory(
    result: ITransaction[],
    e: Error = null,
  ): Promise<ITransaction[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async search(
    result: ITransaction[],
    e: Error = null,
  ): Promise<ITransaction[]> {
    if (e) {
      throw e;
    }
    return result;
  }

  async addTransaction(
    result: ITransaction,
    e: Error = null,
  ): Promise<ITransaction> {
    if (e) {
      throw e;
    }
    return result;
  }

  async updateTransaction(
    result: ITransaction,
    e: Error = null,
  ): Promise<ITransaction> {
    if (e) {
      throw e;
    }
    return result;
  }

  async deleteTransaction(
    transaction: ITransaction,
    e: Error = null,
  ): Promise<ITransaction> {
    if (e) {
      throw e;
    }
    return transaction;
  }

  async getTransactionsCountBy(
    result: number,
    e: Error = null,
  ): Promise<number> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionsSumBy(result: number, e: Error = null): Promise<number> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionsCountForDateRange(
    result: number,
    e: Error = null,
  ): Promise<number> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionsSumForDateRange(
    result: number,
    e: Error = null,
  ): Promise<number> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error = null,
  ): Promise<TransactionsComparisonDto> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error = null,
  ): Promise<TransactionsComparisonDto> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error = null,
  ): Promise<TransactionsComparisonDto> {
    if (e) {
      throw e;
    }
    return result;
  }

  async getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error = null,
  ): Promise<TransactionsComparisonDto> {
    if (e) {
      throw e;
    }
    return result;
  }
}
