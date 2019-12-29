import 'ts-jest';
import ReportDistributionInteractor from '../transactions/interactors/reportDistribution.interactor';
import TransactionAnalyticService from '../../domain/transactions/services/transactionAnalyticService';
import FakeReportDistributionOutputPort from './fakeReportDistributionOutputPort';
import FakeEventDispatchGeneratedReportService from './fakeEventDispatchGeneratedReportService';
import { AvailableAnalyticMetric } from '../../domain/transactions/enums/availableAnalyticMetric.enum';
import { Period } from '../../domain/period/enums/period.enum';
import FakeRepo from '../../domain/test/fakeRepo';
import IRepository, { Criteria } from '../../domain/repository.interface';
import IDistributingMetricItem from '../transactions/entities/distributingMetricItem.interface';
import ITransaction from '../../domain/transactions/entities/transaction.interface';

describe('TransactionCategoryInteractor tests', () => {
  const distributingMetricItemRepo: IRepository<
    IDistributingMetricItem
  > = new FakeRepo<IDistributingMetricItem>([]);
  const service: ReportDistributionInteractor = new ReportDistributionInteractor(
    distributingMetricItemRepo,
    new FakeRepo<ITransaction>([]),
    new TransactionAnalyticService([], null, null),
    new FakeEventDispatchGeneratedReportService(),
    new FakeReportDistributionOutputPort(),
  );

  it('check methods existance', () => {
    expect(service.subscribe).toBeDefined();
    expect(service.unsubscribe).toBeDefined();
    expect(service.send).toBeDefined();
  });

  it('test subscribe method', async () => {
    expect(
      await service.subscribe([
        {
          id: '1',
          baseCurrency: null,
          category: null,
          metric:
            AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
          period: Period.MONTH,
          user: null,
        },
      ]),
    ).not.toBeInstanceOf(Error);
  });

  it('test unsubscribe method', async () => {
    jest.spyOn(distributingMetricItemRepo, 'delete').mockImplementationOnce(
      async (
        deleteCriteria: Criteria<IDistributingMetricItem>,
      ): Promise<null> => {
        return null;
      },
    );
    expect(
      await service.unsubscribe([
        {
          id: '1',
          baseCurrency: null,
          category: null,
          metric:
            AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
          period: Period.MONTH,
          user: null,
        },
      ]),
    ).not.toBeInstanceOf(Error);
    jest.spyOn(distributingMetricItemRepo, 'delete').mockClear();
  });

  it('test send method: month period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_SUMT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_SUMT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_SUMT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_SUMT_BY_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_SUMT_BY_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_SUMT_BY_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});

  it('test send method: month period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: quarter period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
  it('test send method: year period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {});
});
