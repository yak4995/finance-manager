import UserShouldBeDeletedEvent from '../../../../app/src/users/events/userShouldBeDeleted.event';
import IAuthorityService from '../../../../app/src/users/interfaces/authorityService.interface';

import IEventListener from '../../events/eventListener.interface';
import { EventStatus } from '../../events/eventStatus.enum';

/* istanbul ignore next */
export default class FakeUserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  constructor(private readonly authorityService: IAuthorityService) {}

  async process(event: UserShouldBeDeletedEvent): Promise<void> {
    event.state = EventStatus.PROCESSING;
    await this.authorityService.deleteAccount(event.user);
    event.state = EventStatus.SUCCEED;
    return;
  }
}
