import { Criteria } from '../../../domain/repository.interface';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

export default interface IDistributingMetricItemCreator {
  getInstance(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem;
}
