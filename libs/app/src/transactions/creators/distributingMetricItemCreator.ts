import EntityCreator from '@domain/entityCreator.interface';
import { Criteria } from '@domain/repository.interface';

import IDistributingMetricItem from '../entities/distributingMetricItem.interface';

// Probably children: TypeOrmDistributingMetricItemCreator, MongoDistributingMetricItemObjectCreator, XMLDistributingMetricItemCreator
export default interface IDistributingMetricItemCreator
  extends EntityCreator<IDistributingMetricItem> {
  getInstance(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem;
}
