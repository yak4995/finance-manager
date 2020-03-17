import { Injectable, Inject } from '@nestjs/common';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import IRepository from '../../../core/domain/repository.interface';

@Injectable()
export class CurrencyFactory extends CurrencyAbstractFactory {
  public constructor(
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
