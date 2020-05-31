import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../users/events/userHasBeenCreated.event';
import FakeUserHasBeenCreatedEventListener from './fakeUserHasBeenCreatedEventListener';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import IEventListener from '../../../../core/app/events/eventListener.interface';

/* istanbul ignore next */
export default class FakeRegisteredUserEventDispatchService extends IEventDispatchService<
  UserHasBeenCreatedEvent
> {
  constructor() {
    super([new FakeUserHasBeenCreatedEventListener()]);
  }

  public async emit(event: UserHasBeenCreatedEvent): Promise<boolean> {
    event.state = EventStatus.PROCESSING;
    try {
      await Promise.all(
        this.eventListeners.map(
          (listener: IEventListener<UserHasBeenCreatedEvent>): Promise<any> =>
            listener.process(event),
        ),
      );
      event.state = EventStatus.SUCCEED;
      return true;
    } catch (e) {
      event.state = EventStatus.FAILED;
      return false;
    }
  }

  protected async processEvent(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
