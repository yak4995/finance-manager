import { Inject, Logger } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import CurrencyShouldBeDeletedEvent from '../events/currencyShouldBeDeleted.event';

// TODO: to transport?
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
      Logger.error(
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
