import EntityCreator from '../../entityCreator.interface';
import ICurrency from '../entities/currency.interface';
import IRepository, { Criteria } from '../../repository.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
export default abstract class CurrencyAbstractFactory {
  protected constructor(private currencyCreator: EntityCreator<ICurrency>) {}

  public static setInstance(instance: CurrencyAbstractFactory) {
    this.instance = instance;
  }

  protected static instance: CurrencyAbstractFactory = null;

  /* istanbul ignore next */
  public static getInstance(): CurrencyAbstractFactory {
    if (this.instance !== null) {
      return this.instance;
    }
    return null;
  }

  public createCurrency(fields: Criteria<ICurrency>): ICurrency {
    return this.currencyCreator.getInstance(fields);
  }

  public abstract createCurrencyRepo(): IRepository<ICurrency>;
}
