import { Injectable, Inject } from '@nestjs/common';
import CurrencyAbstractFactory from '../../../core/domain/currencies/factories/currencyFactory';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import ICurrency from '../../../core/domain/currencies/entities/currency.interface';
import IRepository from '../../../core/domain/repository.interface';

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
