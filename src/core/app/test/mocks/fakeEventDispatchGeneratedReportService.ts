import IEventDispatchService from '../../events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '../../transactions/events/reportHasBeenGenerated.event';
import FakeReportHasBeenGeneratedEventListener from './fakeReportHasBeenGeneratedEventListener';
import { EventStatus } from '../../../../core/app/events/eventStatus.enum';
import IEventListener from '../../../../core/app/events/eventListener.interface';

/* istanbul ignore next */
export default class FakeEventDispatchGeneratedReportService extends IEventDispatchService<
  ReportHasBeenGeneratedEvent
> {
  constructor() {
    super([new FakeReportHasBeenGeneratedEventListener()]);
  }

  public async emit(event: ReportHasBeenGeneratedEvent): Promise<boolean> {
    event.state = EventStatus.PROCESSING;
    try {
      await Promise.all(
        super.eventListeners.map(
          (
            listener: IEventListener<ReportHasBeenGeneratedEvent>,
          ): Promise<any> => listener.process(event),
        ),
      );
      event.state = EventStatus.SUCCEED;
      return true;
    } catch (e) {
      event.state = EventStatus.FAILED;
      return false;
    }
  }

  protected async processEvent(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
