import TransactionAbstractFactory from '../../../domain/transactions/factories/transactionFactory';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import EntityCreator from '../../../domain/entityCreator.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';
import FakeRepo from '../../../domain/test/mocks/fakeRepo';

export default class FakeTransactionFactory extends TransactionAbstractFactory {
  constructor(
    private readonly transactions: ITransaction[],
    transactionsCreator: EntityCreator<ITransaction>,
  ) {
    super(transactionsCreator);
  }

  createTransaction(fields: Criteria<ITransaction>): ITransaction {
    return super.createTransaction(fields);
  }

  createTransactionRepo(): IRepository<ITransaction> {
    return new FakeRepo<ITransaction>(this.transactions);
  }
}
