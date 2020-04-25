import IEventListener from '../../events/eventListener.interface';
import { EventStatus } from '../../events/eventStatus.enum';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';
import IAuthorityService from '../../../../core/app/users/interfaces/authorityService.interface';

export default class FakeUserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  constructor(private readonly authorityService: IAuthorityService) {}

  async process(event: UserShouldBeDeletedEvent): Promise<void> {
    event.state = EventStatus.PROCESSING;
    await this.authorityService.deleteAccount(event.userForDeleting);
    event.state = EventStatus.SUCCEED;
    return;
  }
}
