import EntityCreator from '../../entityCreator.interface';
import ITransaction from '../entities/transaction.interface';
import IRepository, { Criteria } from '../../repository.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
// Also we choose between Singleton and type-parameterized factory, because static fields doesn`t support type parameters
export default abstract class TransactionAbstractFactory {
  protected constructor(
    private readonly transactionCreator: EntityCreator<ITransaction>,
  ) {}

  public static setInstance(instance: TransactionAbstractFactory): void {
    this.instance = instance;
  }

  protected static instance: TransactionAbstractFactory = null;

  /* istanbul ignore next */
  public static getInstance(): TransactionAbstractFactory {
    return this.instance;
  }

  public createTransaction(fields: Criteria<ITransaction>): ITransaction {
    return this.transactionCreator.getInstance(fields);
  }

  public abstract createTransactionRepo(): IRepository<ITransaction>;
}
