import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionInputPort {
  subscribe(
    items: IDistributingMetricItem[],
  ): Promise<void>;
  unsubscribe(
    items: IDistributingMetricItem[],
  ): Promise<void>;
  send(item: IDistributingMetricItem): Promise<void>;
}
