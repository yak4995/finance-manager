import { Criteria } from './repository.interface';
import ICurrency from './transactions/currency.interface';
import ITransaction from './transactions/transaction.interface';
import ITransactionCategory from './transactions/transactionCategory.interface';
import IUser from './users/user.interface';
import ICurrencyCreator from './transactions/currencyCreator.interface';
import ITransactionCategoryCreator from './transactions/transactionCategoryCreator';
import ITransactionCreator from './transactions/transactionCreator';
import IUserCreator from './users/userCreator';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
// Probably children: TypeOrmEntityFactory, MongoEntityFactory, XmlEntityFactory
export default abstract class EntityFactory {
  protected constructor(
    private currencyCreator: ICurrencyCreator,
    private transactionCategoryCreator: ITransactionCategoryCreator,
    private transactionCreator: ITransactionCreator,
    private userCreator: IUserCreator,
  ) {}

  private static instance: EntityFactory = null;

  public static getInstance(): EntityFactory {
    if (this.instance !== null) {
      return this.instance;
    }
    return null;
  }

  public createCurrency(fields: Criteria<ICurrency>): ICurrency {
    return this.currencyCreator.getInstance(fields);
  }

  public createTransactionCategory(
    fields: Criteria<ITransactionCategory>,
  ): ITransactionCategory {
    return this.transactionCategoryCreator.getInstance(fields);
  }

  public createTransaction(fields: Criteria<ITransaction>): ITransaction {
    return this.transactionCreator.getInstance(fields);
  }

  public createUser(fields: Criteria<IUser>): IUser {
    return this.userCreator.getInstance(fields);
  }
}
