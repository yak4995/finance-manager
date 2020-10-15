import IEvent from '../../../../core/app/events/event.interface';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import ITransactionCategory from '../../../../core/domain/transactionCategories/entities/transactionCategory.interface';

export default class TransactionCategoryShouldBeDeletedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(public readonly category: ITransactionCategory) {}

  get state(): EventStatus {
    return this.eventState;
  }

  set state(state: EventStatus) {
    this.eventState = state;
  }
}
