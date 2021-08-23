import IDistributingMetricItem from '../transactions/entities/distributingMetricItem.interface';
import DistributingMetricItemAbstractFactory from '../transactions/factories/distributingMetricItemFactory';
import ReportHasBeenGeneratedEvent from '../transactions/events/reportHasBeenGenerated.event';
import { EventStatus } from '../events/eventStatus.enum';
import IEventDispatchService from '../events/eventDispatchService.interface';
import ReportDistributionInteractor from '../transactions/interactors/reportDistribution.interactor';
import ReportDistributionOutputPort from '../transactions/ports/reportDistributionOutput.port';

// mocks
import FakeReportDistributionOutputPort from './mocks/fakeReportDistributionOutputPort';
import FakeEventDispatchGeneratedReportService from './mocks/fakeEventDispatchGeneratedReportService';
import FakeDistributingMetricItemFactory from './mocks/fakeDistributingMetricItemFactory';
import FakeTransactionCategoryFactory from './mocks/fakeTransactionCategoryFactory';
import FakeTransactionFactory from './mocks/fakeTransactionFactory';
import FakeTransactionCategoriesFacade from './mocks/fakeTransactionCategoriesFacade';
import FakeCurrenciesFacade from './mocks/fakeCurrenciesFacade';
import FakeCurrencyFactory from './mocks/fakeCurrencyFactory';

// fixtures
import {
  subscribeItems,
  generateDistributingMetricItemForMetricAndItem,
} from './fixtures/distributingMetricItems';
import {
  fakeBaseCurrency,
  fakeCurrency,
} from '../../../domain/src/test/fixtures/currencies';
import { transactionForTransactionChangeMetrics } from '../../../domain/src/test/fixtures/transactions';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from '../../../domain/src/test/fixtures/transactionCategories';

import ITransactionCategoriesFacade from '../../../domain/src/transactionCategories/transactionCategories.facade';
import IRepository, {
  Criteria,
} from '../../../domain/src/repository.interface';
import ITransactionCategory from '../../../domain/src/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../domain/src/transactionCategories/factories/transactionCategoryFactory';
import TransactionAbstractFactory from '../../../domain/src/transactions/factories/transactionFactory';
import ITransaction from '../../../domain/src/transactions/entities/transaction.interface';
import ICurrencyConverterService from '../../../domain/src/currencies/services/currencyConverterService.interface';
import ICurrenciesFacade from '../../../domain/src/currencies/currencies.facade';
import FakeCurrencyConverter from '../../../domain/src/test/mocks/fakeCurrencyConverter';
import TransactionCategoryService from '../../../domain/src/transactionCategories/services/transactionCategoryService';
import TransactionAnalyticService from '../../../domain/src/transactions/services/transactionAnalyticService';
import { Period } from '../../../domain/src/period/enums/period.enum';
import { AvailableAnalyticMetric } from '../../../domain/src/transactions/enums/availableAnalyticMetric.enum';
import CurrencyAbstractFactory from '../../../domain/src/currencies/factories/currencyFactory';
import ICurrency from '../../../domain/src/currencies/entities/currency.interface';

import { QUARTER_ERROR_MSG } from '../../../common/src/constants/errorMessages.constants';

describe('ReportDistributionInteractor tests', () => {
  DistributingMetricItemAbstractFactory.setInstance(
    new FakeDistributingMetricItemFactory([], {
      getInstance: (fields: Criteria<IDistributingMetricItem>) => null,
    }),
  );
  const fakeDistributingMetricItemFactory: DistributingMetricItemAbstractFactory = FakeDistributingMetricItemFactory.getInstance();
  const fakeDistributingMetricItemRepo: IRepository<any> = fakeDistributingMetricItemFactory.createDistributingMetricItemRepo();
  TransactionCategoryAbstractFactory.setInstance(
    new FakeTransactionCategoryFactory(
      [
        firstCategory,
        secondCategory,
        thirdCategory,
        fourthCategory,
        fifthCategory,
        sixthCategory,
        seventhCategory,
      ],
      {
        getInstance: (
          fields: Criteria<ITransactionCategory>,
        ): ITransactionCategory => ({
          id: 'fakeId',
          isOutcome: fields.isOutcome ? fields.isOutcome : true,
          isSystem: fields.isSystem ? fields.isSystem : false,
          name: fields.name ? fields.name : '',
          owner: fields.owner ? fields.owner : null,
          parentCategory: fields.parentCategory ? fields.parentCategory : null,
        }),
      },
    ),
  );
  TransactionAbstractFactory.setInstance(
    new FakeTransactionFactory(transactionForTransactionChangeMetrics, {
      getInstance: (fields: Criteria<ITransaction>): ITransaction => ({
        id: 'fakeId',
        amount: fields.amount ? fields.amount : 0,
        currency: fields.currency ? fields.currency : null,
        datetime: fields.datetime ? fields.datetime : new Date(),
        owner: fields.owner ? fields.owner : null,
        transactionCategory: fields.transactionCategory,
        description: fields.description ? fields.description : null,
      }),
    }),
  );
  const fakeTransactionFactory: TransactionAbstractFactory = FakeTransactionFactory.getInstance();
  const fakeTransactionCategoryFactory: TransactionCategoryAbstractFactory = FakeTransactionCategoryFactory.getInstance();
  const fakeTransactionRepo: IRepository<ITransaction> = fakeTransactionFactory.createTransactionRepo();
  const faketransactionCategoryRepo: IRepository<ITransactionCategory> = fakeTransactionCategoryFactory.createTransactionCategoryRepo();
  const fakeCurrencyConverter: ICurrencyConverterService = new FakeCurrencyConverter();
  CurrencyAbstractFactory.setInstance(
    new FakeCurrencyFactory([fakeCurrency, fakeBaseCurrency], {
      getInstance: (fields: Criteria<ICurrency>): ICurrency => null,
    }),
  );
  const fakeCurrencyFactory: CurrencyAbstractFactory = FakeCurrencyFactory.getInstance();
  const fakeCurrenciesFacade: ICurrenciesFacade = new FakeCurrenciesFacade(
    fakeCurrencyFactory,
    fakeCurrencyConverter,
  );
  const transactionCategoryService: TransactionCategoryService = new TransactionCategoryService(
    faketransactionCategoryRepo,
  );
  const transactionCategoriesFacade: ITransactionCategoriesFacade = new FakeTransactionCategoriesFacade(
    transactionCategoryService,
    fakeTransactionCategoryFactory,
  );
  const transactionAnalyticService: TransactionAnalyticService = new TransactionAnalyticService(
    [],
    fakeCurrenciesFacade,
    transactionCategoriesFacade,
  );
  const eventDispatcher: IEventDispatchService<ReportHasBeenGeneratedEvent> = new FakeEventDispatchGeneratedReportService();
  const outputPort: ReportDistributionOutputPort = new FakeReportDistributionOutputPort();
  const service: ReportDistributionInteractor = new ReportDistributionInteractor(
    fakeDistributingMetricItemFactory,
    fakeTransactionRepo,
    transactionAnalyticService,
    eventDispatcher,
    outputPort,
  );

  beforeAll(() => {
    service['defineDateRange'] = jest
      .fn()
      .mockImplementation((period: Period): [Date, Date] => {
        const startDate: Date = new Date('2019-07-15');
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
            if (startDate.getMonth() === 1) {
              throw new Error(QUARTER_ERROR_MSG);
            }
            if (startDate.getMonth() === 0) {
              startDate.setFullYear(startDate.getFullYear() - 1);
              startDate.setMonth(8);
            } else if (startDate.getMonth() === 2) {
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
        const endDate: Date = new Date('2019-07-15');
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

  it('test getUserSubscriptions method', async () => {
    expect(
      await service.getUserSubscriptions({ id: 'fakeId' }),
    ).not.toBeInstanceOf(Error);
  });

  it('test subscribe method: some insert error', async () => {
    jest
      .spyOn(fakeDistributingMetricItemRepo, 'insert')
      .mockReturnValueOnce(Promise.reject(new Error('Insert error')));
    try {
      await service.subscribe(subscribeItems);
    } catch (e) {
      expect(e.message).toBe('Insert error');
    }
    jest.spyOn(fakeDistributingMetricItemRepo, 'insert').mockClear();
  });

  it('test subscribe method', async () => {
    expect(await service.subscribe(subscribeItems)).not.toBeInstanceOf(Error);
  });

  it('test unsubscribe method: some delete error', async () => {
    jest
      .spyOn(fakeDistributingMetricItemRepo, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error('Delete error')));
    try {
      await service.unsubscribe(subscribeItems);
    } catch (e) {
      expect(e.message).toBe('Delete error');
    }
    jest.spyOn(fakeDistributingMetricItemRepo, 'delete').mockClear();
  });

  it('test unsubscribe method', async () => {
    jest
      .spyOn(fakeDistributingMetricItemRepo, 'delete')
      .mockReturnValueOnce(Promise.resolve(null));
    expect(await service.unsubscribe(subscribeItems)).not.toBeInstanceOf(Error);
    jest.spyOn(fakeDistributingMetricItemRepo, 'delete').mockClear();
  });

  it('test send method: month period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(1);
  });

  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(2);
  });

  it('test send method: year period and TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(5);
  });

  it('test send method: month period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(5_01);
  });

  it('test send method: quarter period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(85_01);
  });

  it('test send method: year period and TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual(250_02);
  });

  it('test send method: month period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(1);
  });

  it('test send method: quarter period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(2);
  });

  it('test send method: year period and TRANSACTIONS_COUNT_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(5);
  });

  it('test send method: month period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(5_01);
  });

  it('test send method: quarter period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(85_01);
  });

  it('test send method: year period and TRANSACTIONS_SUM_BY_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE,
        ),
      ),
    ).toEqual(250_02);
  });

  it('test send method: month period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: quarter period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: year period and TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: month period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: quarter period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: year period and TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('test send method: month period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-07-01': 0,
      '2019-07-02': 0,
      '2019-07-03': 0,
      '2019-07-04': 0,
      '2019-07-05': 0,
      '2019-07-06': 0,
      '2019-07-07': 0,
      '2019-07-08': 0,
      '2019-07-09': 0,
      '2019-07-10': 0,
      '2019-07-11': 0,
      '2019-07-12': 0,
      '2019-07-13': 0,
      '2019-07-14': 0,
      '2019-06-15': 0,
      '2019-06-16': 0,
      '2019-06-17': 0,
      '2019-06-18': 0,
      '2019-06-19': 0,
      '2019-06-20': 0,
      '2019-06-21': 0,
      '2019-06-22': 0,
      '2019-06-23': 0,
      '2019-06-24': 0,
      '2019-06-25': 0,
      '2019-06-26': 0,
      '2019-06-27': 0,
      '2019-06-28': 0,
      '2019-06-29': 0,
      '2019-06-30': 1,
    });
  });

  it('test send method: quarter period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-04-15': 0,
      '2019-05-15': 1,
      '2019-06-15': 1,
    });
  });

  it('test send method: year period and TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-01-15': 1,
      '2019-04-15': 2,
      '2018-07-15': 1,
      '2018-10-15': 1,
    });
  });

  it('test send method: month period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.MONTH,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-07-01': 0,
      '2019-07-02': 0,
      '2019-07-03': 0,
      '2019-07-04': 0,
      '2019-07-05': 0,
      '2019-07-06': 0,
      '2019-07-07': 0,
      '2019-07-08': 0,
      '2019-07-09': 0,
      '2019-07-10': 0,
      '2019-07-11': 0,
      '2019-07-12': 0,
      '2019-07-13': 0,
      '2019-07-14': 0,
      '2019-06-15': 0,
      '2019-06-16': 0,
      '2019-06-17': 0,
      '2019-06-18': 0,
      '2019-06-19': 0,
      '2019-06-20': 0,
      '2019-06-21': 0,
      '2019-06-22': 0,
      '2019-06-23': 0,
      '2019-06-24': 0,
      '2019-06-25': 0,
      '2019-06-26': 0,
      '2019-06-27': 0,
      '2019-06-28': 0,
      '2019-06-29': 0,
      '2019-06-30': 501,
    });
  });

  it('test send method: quarter period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.QUARTER,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-04-15': 0,
      '2019-05-15': 8000,
      '2019-06-15': 501,
    });
  });

  it('test send method: year period and TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE metric', async () => {
    expect(
      await service.send(
        generateDistributingMetricItemForMetricAndItem(
          Period.YEAR,
          AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE,
        ),
      ),
    ).toEqual({
      '2019-01-15': 8000,
      '2019-04-15': 8501,
      '2018-07-15': 8000,
      '2018-10-15': 501,
    });
  });

  afterAll(() => {
    jest.spyOn(service, 'send').mockClear();
  });
});
