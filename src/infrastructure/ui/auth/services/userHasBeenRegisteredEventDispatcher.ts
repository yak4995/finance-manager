import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../../../core/app/users/events/userHasBeenCreated.event';
import IEventListener from '../../../../core/app/events/eventListener.interface';

@Injectable()
export default class UserHasBeenRegisteredEventDispatcher extends IEventDispatchService<
  UserHasBeenCreatedEvent
> {
  constructor(
    @Inject('UserHasBeenCreatedEventListeners')
    eventListeners: IEventListener<UserHasBeenCreatedEvent>[],
    @InjectQueue('mailing')
    private readonly mailingQueue: Queue<UserHasBeenCreatedEvent>,
  ) {
    super(eventListeners);
  }

  async emit(event: UserHasBeenCreatedEvent): Promise<boolean> {
    try {
      await this.mailingQueue.add(event);
    } catch (e) {
      Logger.error(
        e.message,
        e.stack,
        'UserHasBeenRegisteredEventDispatcher::emit',
      );
      return false;
    }
    return true;
  }
}
