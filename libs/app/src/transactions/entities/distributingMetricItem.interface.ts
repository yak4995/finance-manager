import ICurrency from '@domain/currencies/entities/currency.interface';
import { Period } from '@domain/period/enums/period.enum';
import IPersistantEntity from '@domain/persistantEntity';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';

import IUserCredential from '../../users/entities/userCredential.interface';

// Probably children: TypeOrmDistributingMetricItemEntity, MongooseDistributingMetricItemSchema, XMLDistributingMetricItemEntity
export default interface IDistributingMetricItem extends IPersistantEntity {
  user: IUserCredential; // whose
  period: Period; // frequency of distributing
  metric: AvailableAnalyticMetric; // what
  category: ITransactionCategory | null; // filter byx
  baseCurrency: ICurrency | null; // in which currency
}
