import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../users/events/userHasBeenCreated.event';
import FakeUserHasBeenCreatedEventListener from './fakeUserHasBeenCreatedEventListener';

export default class FakeRegisteredUserEventDispatchService extends IEventDispatchService<
  UserHasBeenCreatedEvent
> {
  constructor() {
    super([new FakeUserHasBeenCreatedEventListener()]);
  }
}
