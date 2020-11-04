import { Inject } from '@nestjs/common';
import { Processor, InjectQueue, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';

import IEventDispatchService from '@app/events/eventDispatchService.interface';
import UserShouldBeDeletedEvent from '@app/users/events/userShouldBeDeleted.event';
import IEventListener from '@app/events/eventListener.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

@Processor('sheduledUsersForDelete')
export default class UserShouldBeDeletedEventDispatcher extends IEventDispatchService<
  UserShouldBeDeletedEvent
> {
  constructor(
    @Inject('UserShouldBeDeletedEventListeners')
    eventListeners: IEventListener<UserShouldBeDeletedEvent>[],
    @InjectQueue('sheduledUsersForDelete')
    private readonly sheduledUsersForDeleteQueue: Queue<
      UserShouldBeDeletedEvent
    >,
  ) {
    super(eventListeners);
  }

  public async emit(event: UserShouldBeDeletedEvent): Promise<boolean> {
    try {
      await this.sheduledUsersForDeleteQueue.add(event);
      event.state = EventStatus.WAITING;
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'UserShouldBeDeletedEventDispatcher::emit',
      );
      event.state = EventStatus.FAILED;
      return false;
    }
    return true;
  }

  @Process()
  protected async processEvent(
    job: Job<UserShouldBeDeletedEvent>,
  ): Promise<void> {
    job.data.state = EventStatus.PROCESSING;
    this.eventListeners.forEach(
      (listener: IEventListener<UserShouldBeDeletedEvent>): void => {
        listener.process(job.data);
      },
    );
    job.data.state = EventStatus.SUCCEED;
  }
}
