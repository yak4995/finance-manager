import IEventListener from '../../events/eventListener.interface';
import ReportHasBeenGeneratedEvent from '../../transactions/events/reportHasBeenGenerated.event';
import { EventStatus } from '../../events/eventStatus.enum';

/* istanbul ignore next */
export default class FakeReportHasBeenGeneratedEventListener
  implements IEventListener<ReportHasBeenGeneratedEvent> {
  async process(event: ReportHasBeenGeneratedEvent): Promise<void> {
    event.state = EventStatus.SUCCEED;
    return;
  }
}
