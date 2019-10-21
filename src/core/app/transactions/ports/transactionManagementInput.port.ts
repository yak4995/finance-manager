import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import { TransactionDto } from '../dto/transaction.dto';
import { OrderCriteria } from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';

export default interface TransactionManagementInputPort {
  getTransactionDetail(id: string): Promise<void>;
  getTransactions(
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<void>;
  getTransactionsByCategory(
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<void>;
  search(content: string): Promise<void>;
  addTransaction(payload: TransactionDto): Promise<void>;
  updateTransaction(
    transaction: ITransaction,
    payload: TransactionDto,
  ): Promise<void>;
  deleteTransaction(transaction: ITransaction): Promise<void>;
}
