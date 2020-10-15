import CurrencyAbstractFactory from '../../../core/domain/currencies/factories/currencyFactory';
import IRepository from '../../../core/domain/repository.interface';
import ICurrenciesFacade from '../../../core/app/currencies/currencies.facade';
import ICurrency from '../../../core/domain/currencies/entities/currency.interface';
import { Injectable } from '@nestjs/common';

// TODO: make singleton
@Injectable()
export class CurrenciesFacade implements ICurrenciesFacade {
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
