import IEventListener from '../../../../core/app/events/eventListener.interface';
import ICurrency from '../../../../core/domain/transactions/entities/currency.interface';
import CurrencyAbstractFactory from '../../../../core/domain/transactions/factories/currencyFactory';
import IRepository from '../../../../core/domain/repository.interface';
import CurrencyShouldBeDeletedEvent from '../events/currencyShouldBeDeleted.event';

export default class CurrencyShouldBeDeletedEventListener
  implements IEventListener<CurrencyShouldBeDeletedEvent> {
  private readonly currencyRepo: IRepository<ICurrency>;
  constructor(private readonly currencyFactory: CurrencyAbstractFactory) {
    this.currencyRepo = currencyFactory.createCurrencyRepo();
  }

  // TODO: magic literals to configs/enum with templates
  async process(event: CurrencyShouldBeDeletedEvent): Promise<ICurrency> {
    const result: ICurrency[] = await this.currencyRepo.delete({
      id: event.currency.id,
    });
    return result[0];
  }
}
