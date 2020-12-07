import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import CurrencyShouldBeDeletedEvent from '@app/events/currencyShouldBeDeleted.event';

import ICurrency from '@domain/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';
import IRepository from '@domain/repository.interface';

@Injectable()
export default class CurrencyShouldBeDeletedEventListener
  implements IEventListener<CurrencyShouldBeDeletedEvent> {
  private readonly currencyRepo: IRepository<ICurrency>;
  constructor(private readonly currencyFactory: CurrencyAbstractFactory) {
    this.currencyRepo = currencyFactory.createCurrencyRepo();
  }

  async process(event: CurrencyShouldBeDeletedEvent): Promise<ICurrency> {
    const result: ICurrency[] = await this.currencyRepo.delete({
      id: event.currency.id,
    });
    return result[0];
  }
}
