import IPersistantEntity from '../../../domain/persistantEntity';
import IUserCredential from '../../users/entities/userCredential.interface';
import { Period } from '../../../domain/period/enums/period.enum';
import { AvailableAnalyticMetric } from '../../../domain/transactions/enums/availableAnalyticMetric.enum';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import ICurrency from '../../../domain/transactions/entities/currency.interface';

// Probably children: TypeOrmDistributingMetricItemEntity, MongooseDistributingMetricItemSchema, XMLDistributingMetricItemEntity
export default interface IDistributingMetricItem extends IPersistantEntity {
  user: IUserCredential; // whose
  period: Period; // frequency of distributing
  metric: AvailableAnalyticMetric; // what
  category: ITransactionCategory | null; // filter by
  baseCurrency: ICurrency | null; // in which currency
}
