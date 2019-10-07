import { Criteria } from '../domain/repository.interface';
import ICurrency from '../domain/transactions/entities/currency.interface';
import ITransaction from '../domain/transactions/entities/transaction.interface';
import ITransactionCategory from '../domain/transactions/entities/transactionCategory.interface';
import ICurrencyCreator from '../domain/transactions/creators/currencyCreator.interface';
import ITransactionCategoryCreator from '../domain/transactions/creators/transactionCategoryCreator';
import ITransactionCreator from '../domain/transactions/creators/transactionCreator';
import IUserCredential from './users/entities/userCredential.interface';
import IUserCredentialCreator from './users/creators/userCredentialCreator';
import IDistributingMetricItemCreator from './transactions/creators/distributingMetricItemCreator';
import IDistributingMetricItem from './transactions/entities/distributingMetricItem.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
// Probably children: TypeOrmEntityFactory, MongoObjectsEntityFactory, XmlEntityFactory
export default abstract class EntityFactory {
  protected constructor(
    private currencyCreator: ICurrencyCreator,
    private transactionCategoryCreator: ITransactionCategoryCreator,
    private transactionCreator: ITransactionCreator,
    private userCredentialCreator: IUserCredentialCreator,
    private distributingMetricItemCreator: IDistributingMetricItemCreator,
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

  public createUserCredential(
    fields: Criteria<IUserCredential>,
  ): IUserCredential {
    return this.userCredentialCreator.getInstance(fields);
  }

  public createDistributingMetricItem(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem {
    return this.distributingMetricItemCreator.getInstance(fields);
  }
}
