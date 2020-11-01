import IUser from '@domain/users/entities/user.interface';

import IEvent from '../../events/event.interface';
import { EventStatus } from '../../events/eventStatus.enum';

export default class UserShouldBeDeletedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(public readonly user: IUser) {}

  get state(): EventStatus {
    return this.eventState;
  }

  set state(state: EventStatus) {
    this.eventState = state;
  }
}
