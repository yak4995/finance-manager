import { METHOD_IS_NOT_IMPLEMENTED_MSG } from '@common/constants/errorMessages.constants';

import IEventListener from '../../../../app/src/events/eventListener.interface';
import { EventStatus } from '../../../../app/src/events/eventStatus.enum';
import UserShouldBeDeletedEvent from '../../../../app/src/users/events/userShouldBeDeleted.event';
import IAuthorityService from '../../../../app/src/users/interfaces/authorityService.interface';

import IEventDispatchService from '../../events/eventDispatchService.interface';
import FakeUserShouldBeDeletedEventListener from './fakeUserShouldBeDeletedEventListener';

/* istanbul ignore next */
export default class FakeUserForDeletingEventDispatchService extends IEventDispatchService<
  UserShouldBeDeletedEvent
> {
  constructor(authorityService: IAuthorityService) {
    super([new FakeUserShouldBeDeletedEventListener(authorityService)]);
  }

  public async emit(event: UserShouldBeDeletedEvent): Promise<boolean> {
    event.state = EventStatus.PROCESSING;
    try {
      await Promise.all(
        this.eventListeners.map(
          (listener: IEventListener<UserShouldBeDeletedEvent>): Promise<any> =>
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
