import IEventDispatchService from '../events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '../transactions/events/reportHasBeenGenerated.event';
import FakeReportHasBeenGeneratedEventListener from './fakeReportHasBeenGeneratedEventListener';

export default class FakeEventDispatchGeneratedReportService extends IEventDispatchService<
  ReportHasBeenGeneratedEvent
> {
  constructor() {
    super([new FakeReportHasBeenGeneratedEventListener()]);
  }
}
