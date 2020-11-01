import IDistributingMetricItem from '@app/transactions/entities/distributingMetricItem.interface';

import EntityCreator from '@domain/entityCreator.interface';
import { Period } from '@domain/period/enums/period.enum';
import { Criteria } from '@domain/repository.interface';
import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';

import { Injectable } from '@nestjs/common';

@Injectable()
export default class DistributingMetricItemCreator
  implements EntityCreator<IDistributingMetricItem> {
  public getInstance(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem {
    if (!fields.baseCurrency) {
      throw new Error(
        'baseCurrency field in distributing metric item creator is undefined',
      );
    }
    if (!fields.user) {
      throw new Error(
        'user field in distributing metric item creator is undefined',
      );
    }
    if (!fields.category) {
      throw new Error(
        'category field in distributing metric item creator is undefined',
      );
    }
    return {
      id: fields.id ?? 'fakeId',
      period: fields.period ?? Period.MONTH,
      metric:
        fields.metric ??
        AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
      baseCurrency: fields.baseCurrency,
      category: fields.category,
      user: fields.user,
    };
  }
}
