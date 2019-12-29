import IEventListener from '../events/eventListener.interface';
import ReportHasBeenGeneratedEvent from '../transactions/events/reportHasBeenGenerated.event';

export default class FakeReportHasBeenGeneratedEventListener
  implements IEventListener<ReportHasBeenGeneratedEvent> {
  async process(event: ReportHasBeenGeneratedEvent): Promise<void> {
    return;
  }
}
