import { Inject } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';

import { FileLoggerService } from '../../../transport/logger/fileLogger.service';

import IEventDispatchService from '@app/events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '@app/transactions/events/reportHasBeenGenerated.event';
import IEventListener from '@app/events/eventListener.interface';
import { EventStatus } from '@app/events/eventStatus.enum';

@Processor('metrics')
export default class ReportHasBeenGeneratedEventDispatcher extends IEventDispatchService<
  ReportHasBeenGeneratedEvent
> {
  constructor(
    @Inject('TransactionCategoryShouldBeDeletedEventListeners')
    eventListeners: IEventListener<ReportHasBeenGeneratedEvent>[],
    @InjectQueue('metrics')
    private readonly metricsQueue: Queue<ReportHasBeenGeneratedEvent>,
  ) {
    super(eventListeners);
  }

  public async emit(event: ReportHasBeenGeneratedEvent): Promise<boolean> {
    try {
      await this.metricsQueue.add(event);
      event.state = EventStatus.WAITING;
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'ReportHasBeenGeneratedEventDispatcher::emit',
      );
      event.state = EventStatus.FAILED;
      return false;
    }
    return true;
  }

  @Process()
  protected async processEvent(
    job: Job<ReportHasBeenGeneratedEvent>,
  ): Promise<void> {
    job.data.state = EventStatus.PROCESSING;
    this.eventListeners.forEach(
      (listener: IEventListener<ReportHasBeenGeneratedEvent>): void => {
        listener.process(job.data);
      },
    );
    job.data.state = EventStatus.SUCCEED;
  }
}
