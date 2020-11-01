import ICurrency from '../../../../domain/src/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '../../../../domain/src/currencies/factories/currencyFactory';
import EntityCreator from '../../../../domain/src/entityCreator.interface';
import IRepository, {
  Criteria,
} from '../../../../domain/src/repository.interface';
import FakeRepo from '../../../../domain/src/test/mocks/fakeRepo';

/* istanbul ignore next */
export default class FakeCurrencyFactory extends CurrencyAbstractFactory {
  constructor(
    private readonly currencies: ICurrency[],
    currenciesCreator: EntityCreator<ICurrency>,
  ) {
    super(currenciesCreator);
  }

  createCurrency(fields: Criteria<ICurrency>): ICurrency {
    return super.createCurrency(fields);
  }

  createCurrencyRepo(): IRepository<ICurrency> {
    return new FakeRepo<ICurrency>(this.currencies);
  }
}
