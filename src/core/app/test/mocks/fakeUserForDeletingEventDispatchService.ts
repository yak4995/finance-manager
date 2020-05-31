import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';
import FakeUserShouldBeDeletedEventListener from './fakeUserShouldBeDeletedEventListener';
import IAuthorityService from '../../../../core/app/users/interfaces/authorityService.interface';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import IEventListener from '../../../../core/app/events/eventListener.interface';

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
    throw new Error('Method not implemented.');
  }
}
