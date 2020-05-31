import EntityCreator from '../../entityCreator.interface';
import ITransactionCategory from '../entities/transactionCategory.interface';
import IRepository, { Criteria } from '../../repository.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
export default abstract class TransactionCategoryAbstractFactory {
  protected constructor(
    private readonly transactionCategoryCreator: EntityCreator<
      ITransactionCategory
    >,
  ) {}

  public static setInstance(instance: TransactionCategoryAbstractFactory) {
    this.instance = instance;
  }

  protected static instance: TransactionCategoryAbstractFactory = null;

  public static getInstance(): TransactionCategoryAbstractFactory {
    return this.instance;
  }

  public createTransactionCategory(
    fields: Criteria<ITransactionCategory>,
  ): ITransactionCategory {
    return this.transactionCategoryCreator.getInstance(fields);
  }

  public abstract createTransactionCategoryRepo(): IRepository<
    ITransactionCategory
  >;
}
