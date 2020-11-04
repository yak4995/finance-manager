import IEvent from '@app/events/event.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';

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
