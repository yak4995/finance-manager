import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';
import FakeUserShouldBeDeletedEventListener from './fakeUserShouldBeDeletedEventListener';
import IAuthorityService from '../../../../core/app/users/interfaces/authorityService.interface';

export default class FakeUserForDeletingEventDispatchService extends IEventDispatchService<
  UserShouldBeDeletedEvent
> {
  constructor(authorityService: IAuthorityService) {
    super([new FakeUserShouldBeDeletedEventListener(authorityService)]);
  }
}
