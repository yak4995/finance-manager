import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default interface ReportDistributionOutputPort {
  processMetricSubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<any>;
  processMetricUnsubscribing(
    result: IDistributingMetricItem[] | null,
  ): Promise<any>;
  processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
  ): Promise<any>;
}
