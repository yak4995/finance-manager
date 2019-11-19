import IEvent from '../../events/event.interface';
import { EventStatus } from '../../events/eventStatus.enum';
import IUserCredential from '../entities/userCredential.interface';

export default class UserHasBeenCreatedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(private readonly user: IUserCredential) {}

  get state(): EventStatus {
    return this.eventState;
  }
  set state(state: EventStatus) {
    this.eventState = state;
  }
  get registeredUser(): IUserCredential {
    return this.user;
  }
}
