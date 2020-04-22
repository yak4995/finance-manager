import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import ITransactionDto from '../dto/iTransaction.dto';
import { OrderCriteria } from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';

export default interface TransactionManagementInputPort {
  getTransactionDetail(id: string): Promise<any>;
  getTransactions(
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<any>;
  getTransactionsByCategory(
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<any>;
  search(content: string): Promise<any>;
  addTransaction(payload: ITransactionDto): Promise<any>;
  updateTransaction(
    transaction: ITransaction,
    payload: ITransactionDto,
  ): Promise<any>;
  deleteTransaction(transaction: ITransaction): Promise<any>;
}
