import IEvent from '@app/events/event.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

import ICurrency from '@domain/currencies/entities/currency.interface';

export default class CurrencyShouldBeDeletedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(public readonly currency: ICurrency) {}

  get state(): EventStatus {
    return this.eventState;
  }

  set state(state: EventStatus) {
    this.eventState = state;
  }
}
