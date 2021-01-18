import { METHOD_IS_NOT_IMPLEMENTED_MSG } from '@common/constants/errorMessages.constants';

import IEventListener from '../../../../app/src/events/eventListener.interface';
import { EventStatus } from '../../../../app/src/events/eventStatus.enum';

import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../users/events/userHasBeenCreated.event';
import FakeUserHasBeenCreatedEventListener from './fakeUserHasBeenCreatedEventListener';

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
    throw new Error(METHOD_IS_NOT_IMPLEMENTED_MSG);
  }
}
