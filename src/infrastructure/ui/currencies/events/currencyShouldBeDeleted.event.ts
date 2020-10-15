import IEvent from '../../../../core/app/events/event.interface';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import ICurrency from '../../../../core/domain/currencies/entities/currency.interface';

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
