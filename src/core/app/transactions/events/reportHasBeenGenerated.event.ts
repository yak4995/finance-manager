import IEvent from '../../events/event.interface';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import { EventStatus } from '../../events/eventStatus.enum';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default class ReportHasBeenGeneratedEvent implements IEvent {
  private eventState: EventStatus = EventStatus.WAITING;

  constructor(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
  ) {}

  get state(): EventStatus {
    return this.eventState;
  }

  set state(state: EventStatus) {
    this.eventState = state;
  }
}
