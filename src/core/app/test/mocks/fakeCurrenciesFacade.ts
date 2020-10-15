import IRepository from '../../../domain/repository.interface';
import ICurrency from '../../../domain/currencies/entities/currency.interface';
import ICurrenciesFacade from '../../currencies/currencies.facade';
import CurrencyAbstractFactory from '../../../domain/currencies/factories/currencyFactory';

export default class FakeCurrenciesFacade implements ICurrenciesFacade {
  private readonly currenciesRepo: IRepository<ICurrency>;

  constructor(currencyFactory: CurrencyAbstractFactory) {
    this.currenciesRepo = currencyFactory.createCurrencyRepo();
  }

  public findById(id: string): Promise<ICurrency> {
    return this.currenciesRepo.findById(id);
  }

  public findByCode(code: string): Promise<ICurrency> {
    return this.currenciesRepo.findOneByAndCriteria({ code });
  }
}
