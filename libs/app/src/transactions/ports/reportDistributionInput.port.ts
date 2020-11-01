import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionInputPort {
  subscribe(items: IDistributingMetricItem[]): Promise<any>;
  unsubscribe(items: IDistributingMetricItem[]): Promise<any>;
  send(item: IDistributingMetricItem): Promise<any>;
}
