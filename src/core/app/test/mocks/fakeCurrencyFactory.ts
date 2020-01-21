import CurrencyAbstractFactory from '../../../domain/transactions/factories/currencyFactory';
import ICurrency from '../../../domain/transactions/entities/currency.interface';
import EntityCreator from '../../../domain/entityCreator.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';
import FakeRepo from '../../../domain/test/mocks/fakeRepo';

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
