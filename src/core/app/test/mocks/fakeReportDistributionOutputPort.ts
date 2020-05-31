import IDistributingMetricItem from '../../transactions/entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';
import ReportDistributionOutputPort from '../../transactions/ports/reportDistributionOutput.port';

/* istanbul ignore next */
export default class FakeReportDistributionOutputPort
  implements ReportDistributionOutputPort {
  async processMetricSubscribing(
    result: IDistributingMetricItem[] | null,
    e: Error = null,
  ): Promise<void> {
    if (e) {
      throw e;
    }
  }
  async processMetricUnsubscribing(
    result: IDistributingMetricItem[] | null,
    e: Error = null,
  ): Promise<void> {
    if (e) {
      throw e;
    }
  }
  async processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
    e: Error = null,
  ): Promise<number | TransactionsComparisonDto> {
    if (e) {
      throw e;
    }
    return result;
  }
}
