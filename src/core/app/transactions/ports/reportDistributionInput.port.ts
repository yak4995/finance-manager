import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionInputPort {
  subscribe(
    destination: string,
    items: IDistributingMetricItem[],
  ): Promise<void>;
  unsubscribe(
    destination: string,
    items: IDistributingMetricItem[],
  ): Promise<void>;
  send(destination: string, data: any): Promise<void>;
}
