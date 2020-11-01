import { Inject } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';

import TransactionCategoryShouldBeDeletedEvent from '../events/transactionCategoryShouldBeDeleted.event';

import { FileLoggerService } from '../../../transport/logger/fileLogger.service';

import IEventDispatchService from '@app/events/eventDispatchService.interface';
import IEventListener from '@app/events/eventListener.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

@Processor('categoryDeletion')
export default class TransactionCategoryShoulBeDeletedEventDispatcher extends IEventDispatchService<
  TransactionCategoryShouldBeDeletedEvent
> {
  constructor(
    @Inject('TransactionCategoryShouldBeDeletedEventListeners')
    eventListeners: IEventListener<TransactionCategoryShouldBeDeletedEvent>[],
    @InjectQueue('categoryDeletion')
    private readonly categoryDeletionQueue: Queue<
      TransactionCategoryShouldBeDeletedEvent
    >,
  ) {
    super(eventListeners);
  }

  public async emit(
    event: TransactionCategoryShouldBeDeletedEvent,
  ): Promise<boolean> {
    try {
      await this.categoryDeletionQueue.add(event);
      event.state = EventStatus.WAITING;
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'TransactionCategoryShoulBeDeletedEventDispatcher::emit',
      );
      event.state = EventStatus.FAILED;
      return false;
    }
    return true;
  }

  @Process()
  protected async processEvent(
    job: Job<TransactionCategoryShouldBeDeletedEvent>,
  ): Promise<void> {
    job.data.state = EventStatus.PROCESSING;
    this.eventListeners.forEach(
      (
        listener: IEventListener<TransactionCategoryShouldBeDeletedEvent>,
      ): void => {
        listener.process(job.data);
      },
    );
    job.data.state = EventStatus.SUCCEED;
  }
}
