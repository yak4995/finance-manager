import { Inject } from '@nestjs/common';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import { Processor, InjectQueue, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import { FileLoggerService } from '../../../transport/logger/fileLogger.service';

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
