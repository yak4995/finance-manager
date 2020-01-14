import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default interface ReportDistributionOutputPort {
  processMetricSubscribing(
    result: IDistributingMetricItem[] | null,
    e: Error,
  ): Promise<any>;
  processMetricUnsubscribing(
    result: IDistributingMetricItem[] | null,
    e: Error,
  ): Promise<any>;
  processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
}
