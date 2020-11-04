import ICurrencyConverterService from '../../../../domain/src/currencies/services/currencyConverterService.interface';
import ICurrenciesFacade from '../../../../domain/src/currencies/currencies.facade';
import ICurrency from '../../../../domain/src/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '../../../../domain/src/currencies/factories/currencyFactory';
import IRepository from '../../../../domain/src/repository.interface';

export default class FakeCurrenciesFacade implements ICurrenciesFacade {
  private readonly currenciesRepo: IRepository<ICurrency>;

  constructor(
    currencyFactory: CurrencyAbstractFactory,
    private readonly currencyConverterService: ICurrencyConverterService,
  ) {
    this.currenciesRepo = currencyFactory.createCurrencyRepo();
  }

  public findById(id: string): Promise<ICurrency> {
    return this.currenciesRepo.findById(id);
  }

  public findByCode(code: string): Promise<ICurrency> {
    return this.currenciesRepo.findOneByAndCriteria({ code });
  }

  public getRateFor(from: string, to: string, forDate: Date): Promise<number> {
    return this.currencyConverterService.getRateFor(from, to, forDate);
  }
}
