import { Injectable, Inject, Logger } from '@nestjs/common';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';

@Injectable()
export default class UserShouldBeDeletedEventDispatcher extends IEventDispatchService<
  UserShouldBeDeletedEvent
> {
  constructor(
    @Inject('UserShouldBeDeletedEventListeners')
    eventListeners: IEventListener<UserShouldBeDeletedEvent>[],
  ) {
    super(eventListeners);
  }

  async emit(event: UserShouldBeDeletedEvent): Promise<boolean> {
    try {
      const result: boolean = await super.emit(event);
      return result;
    } catch (e) {
      Logger.error(
        e.message,
        e.stack,
        'UserHasBeenRegisteredEventDispatcher::emit',
      );
      return false;
    }
  }
}
