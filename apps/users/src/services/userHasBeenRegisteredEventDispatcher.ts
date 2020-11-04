import { Inject } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';

import IEventDispatchService from '@app/events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '@app/users/events/userHasBeenCreated.event';
import IEventListener from '@app/events/eventListener.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

@Processor('mailing')
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

  public async emit(event: UserHasBeenCreatedEvent): Promise<boolean> {
    try {
      await this.mailingQueue.add(event);
      event.state = EventStatus.WAITING;
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'UserHasBeenRegisteredEventDispatcher::emit',
      );
      event.state = EventStatus.FAILED;
      return false;
    }
    return true;
  }

  @Process()
  protected async processEvent(
    job: Job<UserHasBeenCreatedEvent>,
  ): Promise<void> {
    job.data.state = EventStatus.PROCESSING;
    this.eventListeners.forEach(
      (listener: IEventListener<UserHasBeenCreatedEvent>): void => {
        listener.process(job.data);
      },
    );
    job.data.state = EventStatus.SUCCEED;
  }
}
