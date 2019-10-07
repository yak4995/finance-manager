import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default interface ReportDistributionOutputPort {
  processMetricSubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<void>;
  processMetricUnsubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<void>;
  processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
  ): Promise<void>;
}
