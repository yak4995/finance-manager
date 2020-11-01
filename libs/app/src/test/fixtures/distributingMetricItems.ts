import { Period } from '../../../../domain/src/period/enums/period.enum';
import { AvailableAnalyticMetric } from '../../../../domain/src/transactions/enums/availableAnalyticMetric.enum';
import IDistributingMetricItem from '../../transactions/entities/distributingMetricItem.interface';

import { fakeBaseCurrency } from '../../../../domain/src/test/fixtures/currencies';
import { firstCategory } from '../../../../domain/src/test/fixtures/transactionCategories';

/* istanbul ignore next */
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

/* istanbul ignore next */
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
