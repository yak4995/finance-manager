import { Criteria } from '../../../domain/repository.interface';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

// Probably children: TypeOrmDistributingMetricItemCreator, MongoDistributingMetricItemObjectCreator, XMLDistributingMetricItemCreator
export default interface IDistributingMetricItemCreator {
  getInstance(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem;
}
