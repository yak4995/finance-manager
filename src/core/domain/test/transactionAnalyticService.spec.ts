import 'ts-jest';

import IRepository from '../repository.interface';
import ITransactionCategory from '../transactionCategories/entities/transactionCategory.interface';
import ICurrencyConverterService from '../currencies/services/currencyConverterService.interface';
import TransactionCategoryService from '../transactionCategories/services/transactionCategoryService';
import TransactionAnalyticService from '../transactions/services/transactionAnalyticService';

import { Period } from '../period/enums/period.enum';
import { InvalidDateRangeException } from '../transactions/exceptions/invalidDateRange.exception';

import FakeRepo from './mocks/fakeRepo';
import FakeCurrencyConverter from './mocks/fakeCurrencyConverter';

import { fakeBaseCurrency } from './fixtures/currencies';
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
  getTransactionCountChangeByMonthPeriodResult,
  getTransactionCountChangeByQuarterPeriodResult,
  getTransactionCountChangeByYearPeriodResult,
  getTransactionSumChangeByMonthPeriodResult,
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
  const service: TransactionAnalyticService = new TransactionAnalyticService(
    [],
    fakeCurrencyConverter,
    transactionCategoryService,
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
      ).toEqual({ '6': 50, '7': 50 });
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
      ).toEqual({ '6': 94, '7': 6 });
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

  it('check getTransactionCountChangeByPeriod: month', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionCountChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.MONTH,
        ),
      ).toEqual(getTransactionCountChangeByMonthPeriodResult);
    } catch (e) {
      throw e;
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

  it('check getTransactionSumChangeByPeriod: month', async () => {
    service.transactions = transactionForTransactionChangeMetrics;
    try {
      expect(
        await service.getTransactionSumChangeByPeriod(
          firstCategory,
          dateStartForTransactionChangeMetrics,
          dateEndForTransactionChangeMetrics,
          Period.MONTH,
          fakeBaseCurrency,
        ),
      ).toEqual(getTransactionSumChangeByMonthPeriodResult);
    } catch (e) {
      throw e;
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
