import ICurrency from '@domain/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';
import EntityCreator from '@domain/entityCreator.interface';
import IRepository from '@domain/repository.interface';

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export default class CurrencyFactory extends CurrencyAbstractFactory {
  constructor(
    @Inject('CurrencyRepositoryForFactory')
    private readonly currencyRepository: IRepository<ICurrency>,
    @Inject('CurrencyCreator')
    currencyCreator: EntityCreator<ICurrency>,
  ) {
    super(currencyCreator);
  }

  public createCurrencyRepo(): IRepository<ICurrency> {
    return this.currencyRepository;
  }
}
