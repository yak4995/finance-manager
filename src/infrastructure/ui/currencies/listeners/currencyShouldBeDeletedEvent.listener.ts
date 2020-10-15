import IEventListener from '../../../../core/app/events/eventListener.interface';
import ICurrency from '../../../../core/domain/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '../../../../core/domain/currencies/factories/currencyFactory';
import IRepository from '../../../../core/domain/repository.interface';
import CurrencyShouldBeDeletedEvent from '../events/currencyShouldBeDeleted.event';

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
