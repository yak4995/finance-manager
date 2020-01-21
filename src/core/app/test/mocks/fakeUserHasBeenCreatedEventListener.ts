import IEventListener from '../../events/eventListener.interface';
import UserHasBeenCreatedEvent from '../../users/events/userHasBeenCreated.event';
import { EventStatus } from '../../events/eventStatus.enum';

export default class FakeUserHasBeenCreatedEventListener
  implements IEventListener<UserHasBeenCreatedEvent> {
  async process(event: UserHasBeenCreatedEvent): Promise<void> {
    event.state = EventStatus.PROCESSING;
    if (event.registeredUser.email === 'badEmail@example.com') {
      event.state = EventStatus.FAILED;
      throw new Error('This email doesn`t exists on mail server');
    }
    event.state = EventStatus.SUCCEED;
    return;
  }
}
