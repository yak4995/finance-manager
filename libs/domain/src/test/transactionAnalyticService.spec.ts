import IRepository, { Criteria } from '../repository.interface';
import ITransactionCategory from '../transactionCategories/entities/transactionCategory.interface';
import ICurrencyConverterService from '../currencies/services/currencyConverterService.interface';
import TransactionCategoryService from '../transactionCategories/services/transactionCategoryService';
import TransactionAnalyticService from '../transactions/services/transactionAnalyticService';
import TransactionCategoryAbstractFactory from '../transactionCategories/factories/transactionCategoryFactory';
import ITransactionCategoriesFacade from '../transactionCategories/transactionCategories.facade';
import CurrencyAbstractFactory from '../currencies/factories/currencyFactory';
import ICurrency from '../currencies/entities/currency.interface';
import ICurrenciesFacade from '../currencies/currencies.facade';
import { Period } from '../period/enums/period.enum';
import { InvalidDateRangeException } from '../transactions/exceptions/invalidDateRange.exception';

// mocks
import FakeRepo from './mocks/fakeRepo';
import FakeCurrencyConverter from './mocks/fakeCurrencyConverter';
import FakeTransactionCategoryFactory from '../../../app/src/test/mocks/fakeTransactionCategoryFactory';
import FakeTransactionCategoriesFacade from '../../../app/src/test/mocks/fakeTransactionCategoriesFacade';
import FakeCurrenciesFacade from '../../../app/src/test/mocks/fakeCurrenciesFacade';
import FakeCurrencyFactory from '../../../app/src/test/mocks/fakeCurrencyFactory';

// fixtures
import { fakeBaseCurrency, fakeCurrency } from './fixtures/currencies';
import {
  thirdCategory,
  sixthCategory,
  seventhCategory,
  secondCategory,
  firstCategory,
  fourthCategory,
  fifthCategory,
} from './fixtures/transactionCategories';
import {
  transactionForTransactionChangeMetrics,
  generateTransactionsForSumMetrics,
  generateTransactionsForCountMetrics,
  generateTransactionsForRatioByCategories,
  getTransactionCountChangeByQuarterPeriodResult,
  getTransactionCountChangeByYearPeriodResult,
  getTransactionSumChangeByQuarterPeriodResult,
  getTransactionSumChangeByYearPeriodResult,
} from './fixtures/transactions';
import {
  dateStartForTransactionChangeMetrics,
  dateEndForTransactionChangeMetrics,
} from './fixtures/dateRanges';

describe('TransactionAnalyticService tests', () => {
  const now: Date = new Date();
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
  const fakeTransactionCategoryFactory: TransactionCategoryAbstractFactory = FakeTransactionCategoryFactory.getInstance();
  const fakeTransactionCategoryRepo: IRepository<ITransactionCategory> = new FakeRepo<
    ITransactionCategory
  >([
    firstCategory,
    secondCategory,
    thirdCategory,
    fourthCategory,
    fifthCategory,
    sixthCategory,
    seventhCategory,
  ]);
  const transactionCategoryService: TransactionCategoryService = new TransactionCategoryService(
    fakeTransactionCategoryRepo,
  );
  const transactionCategoriesFacade: ITransactionCategoriesFacade = new FakeTransactionCategoriesFacade(
    transactionCategoryService,
    fakeTransactionCategoryFactory,
  );
  const service: TransactionAnalyticService = new TransactionAnalyticService(
    [],
    fakeCurrenciesFacade,
    transactionCategoriesFacade,
  );

  it('check methods existance', () => {
    expect(service.getTransactionsCountBy).toBeDefined();
    expect(service.getTransactionsSumBy).toBeDefined();
    expect(service.getTransactionsCountForDateRange).toBeDefined();
    expect(service.getTransactionsSumForDateRange).toBeDefined();
    expect(service.getTransactionCountRatioByCategories).toBeDefined();
    expect(service.getTransactionSumRatioByCategories).toBeDefined();
    expect(service.getTransactionCountChangeByPeriod).toBeDefined();
    expect(service.getTransactionSumChangeByPeriod).toBeDefined();
  });

  it('check getTransactionsCountBy', async () => {
    service.transactions = generateTransactionsForCountMetrics(now);
    try {
      expect(
        await service.getTransactionsCountBy(thirdCategory, now, now),
      ).toBe(1);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionsSumBy', async () => {
    service.transactions = generateTransactionsForSumMetrics(now);
    try {
      expect(
        await service.getTransactionsSumBy(
          thirdCategory,
          now,
          now,
          fakeBaseCurrency,
        ),
      ).toBe(85_01);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionsCountForDateRange', async () => {
    service.transactions = generateTransactionsForCountMetrics(now);
    try {
      expect(await service.getTransactionsCountForDateRange(now, now)).toBe(2);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionsSumForDateRange', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    service.transactions = generateTransactionsForSumMetrics(now);
    try {
      expect(
        await service.getTransactionsSumForDateRange(
          now,
          now,
          fakeBaseCurrency,
        ),
      ).toBe(90_02);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionCountRatioByCategories', async () => {
    service.transactions = generateTransactionsForRatioByCategories(now);
    try {
      expect(
        await service.getTransactionCountRatioByCategories(
          thirdCategory,
          now,
          now,
        ),
      ).toEqual({ '3': 60, '6': 20, '7': 20 });
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionSumRatioByCategories', async () => {
    service.transactions = generateTransactionsForRatioByCategories(now);
    try {
      expect(
        await service.getTransactionSumRatioByCategories(
          thirdCategory,
          now,
          now,
          fakeBaseCurrency,
        ),
      ).toEqual({ '3': 66, '6': 32, '7': 2 });
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionCountChangeByPeriod: checkDateRangeForDynamicAnalytics method', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      await service.getTransactionCountChangeByPeriod(
        firstCategory,
        now,
        now,
        Period.MONTH,
      );
    } catch (e) {
      expect(e).toEqual(
        new InvalidDateRangeException("'by' period is less than date range"),
      );
    }
  });

  it('check getTransactionCountChangeByPeriod: quarter', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionCountChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.QUARTER,
        ),
      ).toEqual(getTransactionCountChangeByQuarterPeriodResult);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionCountChangeByPeriod: year', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionCountChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.YEAR,
        ),
      ).toEqual(getTransactionCountChangeByYearPeriodResult);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionSumChangeByPeriod: checkDateRangeForDynamicAnalytics method', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      await service.getTransactionSumChangeByPeriod(
        firstCategory,
        now,
        now,
        Period.MONTH,
        fakeBaseCurrency,
      );
    } catch (e) {
      expect(e).toEqual(
        new InvalidDateRangeException("'by' period is less than date range"),
      );
    }
  });

  it('check getTransactionSumChangeByPeriod: quarter', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionSumChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.QUARTER,
          fakeBaseCurrency,
        ),
      ).toEqual(getTransactionSumChangeByQuarterPeriodResult);
    } catch (e) {
      throw e;
    }
  });

  it('check getTransactionSumChangeByPeriod: year', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionSumChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.YEAR,
          fakeBaseCurrency,
        ),
      ).toEqual(getTransactionSumChangeByYearPeriodResult);
    } catch (e) {
      throw e;
    }
  });
});
