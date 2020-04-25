import IEvent from '../../events/event.interface';
import { EventStatus } from '../../events/eventStatus.enum';
import IUser from '../../../domain/users/entities/user.interface';

export default class UserShouldBeDeletedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(private readonly user: IUser) {}

  get state(): EventStatus {
    return this.eventState;
  }

  set state(state: EventStatus) {
    this.eventState = state;
  }

  get userForDeleting(): IUser {
    return this.user;
  }
}
