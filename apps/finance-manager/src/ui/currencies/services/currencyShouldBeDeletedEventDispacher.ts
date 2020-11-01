import { Inject } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';

import CurrencyShouldBeDeletedEvent from '../events/currencyShouldBeDeleted.event';

import { FileLoggerService } from '../../../transport/logger/fileLogger.service';

import IEventListener from '@app/events/eventListener.interface';
import { EventStatus } from '@app/events/eventStatus.enum';
import IEventDispatchService from '@app/events/eventDispatchService.interface';

@Processor('currencyDeletion')
export default class CurrencyShouldBeDeletedEventDispatcher extends IEventDispatchService<
  CurrencyShouldBeDeletedEvent
> {
  constructor(
    @Inject('CurrencyShouldBeDeletedEventListeners')
    eventListeners: IEventListener<CurrencyShouldBeDeletedEvent>[],
    @InjectQueue('currencyDeletion')
    private readonly currencyDeletionQueue: Queue<CurrencyShouldBeDeletedEvent>,
  ) {
    super(eventListeners);
  }

  public async emit(event: CurrencyShouldBeDeletedEvent): Promise<boolean> {
    try {
      await this.currencyDeletionQueue.add(event);
      event.state = EventStatus.WAITING;
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'CurrencyShouldBeDeletedEventDispatcher::emit',
      );
      event.state = EventStatus.FAILED;
      return false;
    }
    return true;
  }

  @Process()
  protected async processEvent(
    job: Job<CurrencyShouldBeDeletedEvent>,
  ): Promise<void> {
    job.data.state = EventStatus.PROCESSING;
    this.eventListeners.forEach(
      (listener: IEventListener<CurrencyShouldBeDeletedEvent>): void => {
        listener.process(job.data);
      },
    );
    job.data.state = EventStatus.SUCCEED;
  }
}
