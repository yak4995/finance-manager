import IUser from '@domain/users/entities/user.interface';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface ReportDistributionInputPort {
  subscribe(items: IDistributingMetricItem[]): Promise<any>;
  unsubscribe(items: IDistributingMetricItem[]): Promise<any>;
  getUserSubscriptions(user: IUser): Promise<any>;
  send(item: IDistributingMetricItem): Promise<any>;
}
