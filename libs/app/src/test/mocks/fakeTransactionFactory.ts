import EntityCreator from '../../../../domain/src/entityCreator.interface';
import IRepository, {
  Criteria,
} from '../../../../domain/src/repository.interface';
import FakeRepo from '../../../../domain/src/test/mocks/fakeRepo';
import ITransaction from '../../../../domain/src/transactions/entities/transaction.interface';
import TransactionAbstractFactory from '../../../../domain/src/transactions/factories/transactionFactory';

/* istanbul ignore next */
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
