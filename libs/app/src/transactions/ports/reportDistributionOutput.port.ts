import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';

import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionOutputPort {
  processGetUserSubscriptions(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any>;
  processMetricSubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any>;
  processMetricUnsubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any>;
  processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
}
