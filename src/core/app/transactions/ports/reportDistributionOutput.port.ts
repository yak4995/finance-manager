import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionOutputPort {
  processMetricSubscribing(result: IDistributingMetricItem[] | null);
  processMetricUnsubscribing(result: IDistributingMetricItem[] | null);
  processSending();
}
