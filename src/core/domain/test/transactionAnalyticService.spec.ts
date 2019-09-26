import 'ts-jest';
import TransactionAnalyticService from '../transactions/services/transactionAnalyticService';
import FakeCurrencyConverter from './fakeCurrencyConverter';
import FakeCategoryRepo, {
  thirdCategory,
  sixthCategory,
  seventhCategory,
  secondCategory,
  firstCategory,
} from './fakeCategoryRepo';
import TransactionCategoryService from '../transactions/services/transactionCategoryService';
import { Period } from '../period/enums/period.enum';
import { InvalidDateRangeException } from '../transactions/exceptions/invalidDateRange.exception';
import ITransaction from '../transactions/transaction.interface';

describe('TransactionAnalyticService tests', () => {
  const now = new Date();

  const fakeCurrency = {
    id: '1',
    name: 'USD',
    code: 'USD',
  };

  const fakeBaseCurrency = {
    id: '2',
    name: 'EUR',
    code: 'EUR',
  };

  const service = new TransactionAnalyticService(
    [],
    new FakeCurrencyConverter(),
    new TransactionCategoryService(new FakeCategoryRepo()),
  );

  const dateStartForTransactionChangeMetrics = new Date('2017-09-30 00:00:00');
  const dateEndForTransactionChangeMetrics = new Date('2019-09-30 00:00:00');
  const transactionForTransactionChangeMetrics: ITransaction[] = [
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
  ];

  it('check methods existance', () => {
    const service = new TransactionAnalyticService([], null, null);
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
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '2',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: secondCategory,
        datetime: now,
        amount: 5_01,
      },
    ];
    try {
      expect(
        await service.getTransactionsCountBy(thirdCategory, now, now),
      ).toBe(1);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  it('check getTransactionsSumBy', async () => {
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '2',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 5_01,
      },
      {
        id: '3',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: secondCategory,
        datetime: now,
        amount: 5_01,
      },
    ];
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
      console.log(e);
      throw e;
    }
  });

  it('check getTransactionsCountForDateRange', async () => {
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100,
      },
      {
        id: '2',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: secondCategory,
        datetime: now,
        amount: 5.01,
      },
    ];
    try {
      expect(await service.getTransactionsCountForDateRange(now, now)).toBe(2);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  it('check getTransactionsSumForDateRange', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '2',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 5_01,
      },
      {
        id: '3',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: tomorrow,
        amount: 5_01,
      },
    ];
    try {
      expect(
        await service.getTransactionsSumForDateRange(
          now,
          now,
          fakeBaseCurrency,
        ),
      ).toBe(85_01);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  it('check getTransactionCountRatioByCategories', async () => {
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '2',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: sixthCategory,
        datetime: now,
        amount: 5_01,
      },
      {
        id: '3',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: seventhCategory,
        datetime: now,
        amount: 5_01,
      },
    ];
    try {
      expect(
        await service.getTransactionCountRatioByCategories(
          thirdCategory,
          now,
          now,
        ),
      ).toEqual({ '6': 50, '7': 50 });
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  it('check getTransactionSumRatioByCategories', async () => {
    service.transactions = [
      {
        id: '1',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: thirdCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '2',
        currency: fakeCurrency,
        owner: null,
        transactionCategory: sixthCategory,
        datetime: now,
        amount: 100_00,
      },
      {
        id: '3',
        currency: fakeBaseCurrency,
        owner: null,
        transactionCategory: seventhCategory,
        datetime: now,
        amount: 5_01,
      },
    ];
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
      console.log(e);
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
      ).toEqual({
        '2017-10-30': 1,
        '2017-11-30': 0,
        '2017-12-30': 0,
        '2018-1-30': 1,
        '2018-10-2': 1,
        '2018-11-2': 0,
        '2018-12-2': 0,
        '2018-3-2': 0,
        '2018-4-2': 1,
        '2018-5-2': 0,
        '2018-6-2': 0,
        '2018-7-2': 2,
        '2018-8-2': 0,
        '2018-9-2': 0,
        '2019-1-2': 1,
        '2019-10-2': 0,
        '2019-2-2': 0,
        '2019-3-2': 0,
        '2019-4-2': 1,
        '2019-5-2': 0,
        '2019-6-2': 0,
        '2019-7-2': 2,
        '2019-8-2': 0,
        '2019-9-2': 0,
      });
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
      ).toEqual({
        '2017-12-30': 1,
        '2018-12-30': 1,
        '2018-3-30': 1,
        '2018-6-30': 2,
        '2018-9-30': 1,
        '2019-12-30': 0,
        '2019-3-30': 1,
        '2019-6-30': 2,
        '2019-9-30': 1,
      });
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
      ).toEqual({
        '2018-9-30': 5,
        '2019-9-30': 5,
        '2020-9-30': 0,
      });
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
      ).toEqual({
        '2017-10-30': 80_00,
        '2017-11-30': 0,
        '2017-12-30': 0,
        '2018-1-30': 5_01,
        '2018-10-2': 80_00,
        '2018-11-2': 0,
        '2018-12-2': 0,
        '2018-3-2': 0,
        '2018-4-2': 80_00,
        '2018-5-2': 0,
        '2018-6-2': 0,
        '2018-7-2': 85_01,
        '2018-8-2': 0,
        '2018-9-2': 0,
        '2019-1-2': 5_01,
        '2019-10-2': 0,
        '2019-2-2': 0,
        '2019-3-2': 0,
        '2019-4-2': 80_00,
        '2019-5-2': 0,
        '2019-6-2': 0,
        '2019-7-2': 85_01,
        '2019-8-2': 0,
        '2019-9-2': 0,
      });
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
      ).toEqual({
        '2017-12-30': 80_00,
        '2018-12-30': 80_00,
        '2018-3-30': 5_01,
        '2018-6-30': 160_00,
        '2018-9-30': 5_01,
        '2019-12-30': 0,
        '2019-3-30': 5_01,
        '2019-6-30': 160_00,
        '2019-9-30': 5_01,
      });
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
      ).toEqual({
        '2018-9-30': 250_02,
        '2019-9-30': 250_02,
        '2020-9-30': 0,
      });
    } catch (e) {
      throw e;
    }
  });
});
