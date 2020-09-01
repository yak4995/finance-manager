import { Inject, Logger } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import TransactionCategoryShouldBeDeletedEvent from '../events/transactionCategoryShouldBeDeleted.event';

// TODO: to transport?
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
      Logger.error(
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
