import IDistributingMetricItem from '../../transactions/entities/distributingMetricItem.interface';
import { AvailableAnalyticMetric } from '../../../domain/transactions/enums/availableAnalyticMetric.enum';
import { Period } from '../../../domain/period/enums/period.enum';
import { firstCategory } from '../../../domain/test/fixtures/transactionCategories';
import { fakeBaseCurrency } from '../../../domain/test/fixtures/currencies';

export const subscribeItems: IDistributingMetricItem[] = [
  {
    id: '1',
    baseCurrency: null,
    category: null,
    metric:
      AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
    period: Period.MONTH,
    user: null,
  },
];

export const generateDistributingMetricItemForMetricAndItem: (
  period: Period,
  metric: AvailableAnalyticMetric,
) => IDistributingMetricItem = (
  period: Period,
  metric: AvailableAnalyticMetric,
): IDistributingMetricItem => ({
  id: 'fakeId',
  category: firstCategory,
  baseCurrency: fakeBaseCurrency,
  metric,
  period,
  user: null,
});
