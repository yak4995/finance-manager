import IDistributingMetricItem from '../transactions/entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../core/domain/transactions/dto/transactionsComparison.dto';
import ReportDistributionOutputPort from '../transactions/ports/reportDistributionOutput.port';

export default class FakeReportDistributionOutputPort
  implements ReportDistributionOutputPort {
  async processMetricSubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<void> {}
  async processMetricUnsubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<void> {}
  async processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
  ): Promise<number | TransactionsComparisonDto> {
    return result;
  }
}
