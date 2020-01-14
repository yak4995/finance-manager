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
import FakeCurrencyConverter, {
  fakeCurrency,
  fakeBaseCurrency,
} from '../../domain/test/fakeCurrencyConverter';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from './fakeCategoryRepo';
import TransactionCategoryService from '../../domain/transactions/services/transactionCategoryService';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';
import { TransactionsComparisonDto } from '../../domain/transactions/dto/transactionsComparison.dto';
import ReportHasBeenGeneratedEvent from '../transactions/events/reportHasBeenGenerated.event';
import IEventDispatchService from '../events/eventDispatchService.interface';
import ReportDistributionOutputPort from '../transactions/ports/reportDistributionOutput.port';
import { EventStatus } from '../events/eventStatus.enum';

describe('TransactionCategoryInteractor tests', () => {
  const distributingMetricItemRepo: IRepository<IDistributingMetricItem> = new FakeRepo<
    IDistributingMetricItem
  >([]);
  const transactionFakeRepo: IRepository<ITransaction> = new FakeRepo<
    ITransaction
  >([
    // 2017-2018: quarters
    {
      id: '1',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2017-10-01 00:00:00'),
    },
    {
      id: '2',
      owner: null,
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-01-01 00:00:00'),
    },
    {
      id: '3',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-04-01 00:00:00'),
    },
    {
      id: '4',
      owner: null,
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-07-01 00:00:00'),
    },
    // 2018-2019: quarters
    {
      id: '5',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-10-01 00:00:00'),
    },
    {
      id: '6',
      owner: null,
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-01-01 00:00:00'),
    },
    {
      id: '7',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-04-01 00:00:00'),
    },
    {
      id: '8',
      owner: null,
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-07-01 00:00:00'),
    },
    // 2017-2018: additional transaction for some month
    {
      id: '9',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-06-15 00:00:00'),
    },
    // 2017-2018: additional transaction for some month
    {
      id: '10',
      owner: null,
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-06-15 00:00:00'),
    },
  ]);
  const transactionAnalyticService: TransactionAnalyticService = new TransactionAnalyticService(
    [],
    new FakeCurrencyConverter(),
    new TransactionCategoryService(
      new FakeRepo<ITransactionCategory>([
        firstCategory,
        secondCategory,
        thirdCategory,
        fourthCategory,
        fifthCategory,
        sixthCategory,
        seventhCategory,
      ]),
    ),
  );
  const eventDispatcher: IEventDispatchService<ReportHasBeenGeneratedEvent> = new FakeEventDispatchGeneratedReportService();
  const outputPort: ReportDistributionOutputPort = new FakeReportDistributionOutputPort();
  const service: ReportDistributionInteractor = new ReportDistributionInteractor(
    distributingMetricItemRepo,
    transactionFakeRepo,
    transactionAnalyticService,
    eventDispatcher,
    outputPort,
  );

  beforeAll(() => {
    jest
      .spyOn(service, 'defineDateRange')
      .mockImplementation((period: Period): [Date, Date] => {
        const startDate: Date = new Date('2019-09-30 00:00:00');
        switch (period) {
          case Period.MONTH:
            if (startDate.getMonth() > 1) {
              startDate.setMonth(startDate.getMonth() - 1);
            } else {
              startDate.setFullYear(startDate.getFullYear() - 1);
              startDate.setMonth(11);
            }
            break;
          case Period.QUARTER:
            if (startDate.getMonth() == 1) {
              throw new Error('Quarter has not been ended yet!');
            }
            if (startDate.getMonth() == 0) {
              startDate.setFullYear(startDate.getFullYear() - 1);
              startDate.setMonth(8);
            } else if (startDate.getMonth() == 2) {
              startDate.setFullYear(startDate.getFullYear() - 1);
              startDate.setMonth(11);
            } else {
              startDate.setMonth(startDate.getMonth() - 3);
            }
            break;
          case Period.YEAR:
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        }
        const endDate: Date = new Date('2019-09-30 00:00:00');
        return [startDate, endDate];
      });
  });

  it('check methods existance', () => {
    expect(service.subscribe).toBeDefined();
    expect(service.unsubscribe).toBeDefined();
    expect(service.send).toBeDefined();
  });

  it('test ReportHasBeenGeneratedEvent state', () => {
    expect(new ReportHasBeenGeneratedEvent(null, {}).state).toBe(
      EventStatus.WAITING,
    );
  });

  it('test subscribe method: some insert error', async () => {
    jest
      .spyOn(distributingMetricItemRepo, 'insert')
      .mockImplementationOnce((entity: IDistributingMetricItem) => {
        throw new Error('Insert error');
      });
    try {
      await service.subscribe([
        {
          id: 'wrongId',
          baseCurrency: null,
          category: null,
          metric:
            AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
          period: Period.MONTH,
          user: null,
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('Insert error');
    }
    jest.spyOn(distributingMetricItemRepo, 'insert').mockClear();
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

  it('test unsubscribe method: some delete error', async () => {
    jest.spyOn(distributingMetricItemRepo, 'delete').mockImplementationOnce(
      async (
        deleteCriteria: Criteria<IDistributingMetricItem>,
      ): Promise<null> => {
        throw new Error('Delete error');
      },
    );
    try {
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
      ]);
    } catch (e) {
      expect(e.message).toBe('Delete error');
    }
    jest.spyOn(distributingMetricItemRepo, 'delete').mockClear();
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

  it('test send method: month period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual(0);
  });
  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual(1);
  });
  it('test send method: year period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual(5);
  });

  it('test send method: month period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual(0_00);
  });
  it('test send method: quarter period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual(5_01);
  });
  it('test send method: year period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual(250_02);
  });

  it('test send method: month period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual(0);
  });
  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual(1);
  });
  it('test send method: year period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual(5);
  });

  it('test send method: month period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual(0_00);
  });
  it('test send method: quarter period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual(5_01);
  });
  it('test send method: year period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric: AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual(250_02);
  });

  it('test send method: month period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });
  it('test send method: quarter period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });
  it('test send method: year period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: month period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });
  it('test send method: quarter period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });
  it('test send method: year period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: month period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual({ '2019-8-30': 0_00 });
  });
  it('test send method: quarter period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual({ '2019-6-30': 1 });
  });
  it('test send method: year period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual({ '2018-9-30': 5 });
  });

  it('test send method: month period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.MONTH,
        user: null,
      }),
    ).toEqual({ '2019-8-30': 0_00 });
  });
  it('test send method: quarter period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.QUARTER,
        user: null,
      }),
    ).toEqual({ '2019-6-30': 5_01 });
  });
  it('test send method: year period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send({
        id: 'fakeId',
        category: firstCategory,
        baseCurrency: fakeBaseCurrency,
        metric:
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        period: Period.YEAR,
        user: null,
      }),
    ).toEqual({ '2018-9-30': 250_02 });
  });

  afterAll(() => {
    jest.spyOn(service, 'send').mockClear();
  });
});
