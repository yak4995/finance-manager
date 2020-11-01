import ICurrenciesFacade from '@domain/currencies/currencies.facade';
import ICurrency from '@domain/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';
import IRepository from '@domain/repository.interface';

import { Injectable } from '@nestjs/common';

// TODO: make singleton?
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
