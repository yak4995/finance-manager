import IEventListener from '../events/eventListener.interface';
import UserHasBeenCreatedEvent from '../users/events/userHasBeenCreated.event';

export default class FakeUserHasBeenCreatedEventListener
  implements IEventListener<UserHasBeenCreatedEvent> {
  async process(event: UserHasBeenCreatedEvent): Promise<any> {
    if (event.registeredUser.email === 'badEmail@example.com') {
      throw new Error('This email doesn`t exists on mail server');
    }
    return;
  }
}
