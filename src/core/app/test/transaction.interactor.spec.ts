import 'ts-jest';
import TransactionInteractor from '../transactions/interactors/transaction.interactor';
import TransactionAnalyticService from '../../domain/transactions/services/transactionAnalyticService';
import TransactionCategoryService from '../../domain/transactions/services/transactionCategoryService';
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
import ITransaction from '../../domain/transactions/entities/transaction.interface';
import FakeRepo from '../../domain/test/fakeRepo';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';
import FakeEntityFactory from './fakeEntityFactory';
import IRepository from '../../domain/repository.interface';
import ICurrency from '../../domain/transactions/entities/currency.interface';
import FakeSearchService from './FakeSearchService';
import FakeTransactionOutputPort from './fakeTransactionOutputPort';
import { Period } from '../../domain/period/enums/period.enum';

describe('TransactionInteractor tests', () => {
  const now: Date = new Date();
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
  const transactionsSet: ITransaction[] = [
    // 2017-2018: quarters
    {
      id: '1',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2017-10-01 00:00:00'),
    },
    {
      id: '2',
      owner: { id: 'fakeId' },
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-01-01 00:00:00'),
    },
    {
      id: '3',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-04-01 00:00:00'),
    },
    {
      id: '4',
      owner: { id: 'fakeId' },
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-07-01 00:00:00'),
    },
    // 2018-2019: quarters
    {
      id: '5',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-10-01 00:00:00'),
    },
    {
      id: '6',
      owner: { id: 'fakeId' },
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-01-01 00:00:00'),
    },
    {
      id: '7',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-04-01 00:00:00'),
    },
    {
      id: '8',
      owner: { id: 'fakeId' },
      amount: 5_01,
      currency: fakeBaseCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-07-01 00:00:00'),
    },
    // 2017-2018: additional transaction for some month
    {
      id: '9',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2018-06-15 00:00:00'),
    },
    // 2017-2018: additional transaction for some month
    {
      id: '10',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2019-06-15 00:00:00'),
    },
  ];
  const fakeTransactionRepo: IRepository<ITransaction> = new FakeRepo<
    ITransaction
  >(transactionsSet);
  const transactionAnalyticservice: TransactionAnalyticService = new TransactionAnalyticService(
    transactionsSet,
    new FakeCurrencyConverter(),
    transactionCategoryService,
  );
  const service: TransactionInteractor = new TransactionInteractor(
    { id: 'fakeId' },
    FakeEntityFactory.getInstance(),
    transactionCategoryService,
    fakeTransactionCategoryRepo,
    fakeTransactionRepo,
    new FakeRepo<ICurrency>([fakeCurrency, fakeBaseCurrency]),
    transactionAnalyticservice,
    new FakeSearchService<ITransaction>([
      {
        id: 'abc',
        amount: 0,
        currency: fakeBaseCurrency,
        datetime: new Date(),
        owner: { id: 'fakeId' },
        transactionCategory: firstCategory,
        description: 'smth',
      },
    ]),
    new FakeTransactionOutputPort(),
  );

  const dateStartForTransactionChangeMetrics: Date = new Date(
    '2017-09-30 00:00:00',
  );
  const dateEndForTransactionChangeMetrics: Date = new Date(
    '2019-09-30 00:00:00',
  );

  it('check methods existance', () => {
    expect(service.getTransactionDetail).toBeDefined();
    expect(service.getTransactions).toBeDefined();
    expect(service.getTransactionsByCategory).toBeDefined();
    expect(service.search).toBeDefined();
    expect(service.addTransaction).toBeDefined();
    expect(service.updateTransaction).toBeDefined();
    expect(service.deleteTransaction).toBeDefined();
    expect(service.getTransactionsCountBy).toBeDefined();
    expect(service.getTransactionsSumBy).toBeDefined();
    expect(service.getTransactionsCountForDateRange).toBeDefined();
    expect(service.getTransactionsSumForDateRange).toBeDefined();
    expect(service.getTransactionCountRatioByCategories).toBeDefined();
    expect(service.getTransactionSumRatioByCategories).toBeDefined();
    expect(service.getTransactionCountChangeByPeriod).toBeDefined();
    expect(service.getTransactionSumChangeByPeriod).toBeDefined();
  });

  it('check getTransactionDetail method: Such entity has not been found error', async () => {
    expect(await service.getTransactionDetail('fakeId')).toBe(null);
  });

  it('check getTransactionDetail method', async () => {
    expect(await service.getTransactionDetail('1')).toEqual({
      id: '1',
      owner: { id: 'fakeId' },
      amount: 100_00,
      currency: fakeCurrency,
      transactionCategory: firstCategory,
      datetime: new Date('2017-10-01 00:00:00'),
    });
  });

  it('check getTransactions method', async () => {
    expect(await service.getTransactions(1, 2, { id: 'ASC' })).toEqual([
      {
        id: '1',
        owner: { id: 'fakeId' },
        amount: 100_00,
        currency: fakeCurrency,
        transactionCategory: firstCategory,
        datetime: new Date('2017-10-01 00:00:00'),
      },
      {
        id: '10',
        owner: { id: 'fakeId' },
        amount: 100_00,
        currency: fakeCurrency,
        transactionCategory: firstCategory,
        datetime: new Date('2019-06-15 00:00:00'),
      },
    ]);
  });

  it('check getTransactionDetail method', async () => {
    expect(
      await service.getTransactionsByCategory(
        new Date('2017-10-01 00:00:00'),
        new Date('2018-01-01 00:00:00'),
        firstCategory,
      ),
    ).toEqual([
      {
        id: '1',
        owner: { id: 'fakeId' },
        amount: 100_00,
        currency: fakeCurrency,
        transactionCategory: firstCategory,
        datetime: new Date('2017-10-01 00:00:00'),
      },
      {
        id: '2',
        owner: { id: 'fakeId' },
        amount: 5_01,
        currency: fakeBaseCurrency,
        transactionCategory: firstCategory,
        datetime: new Date('2018-01-01 00:00:00'),
      },
    ]);
  });

  it('check search method', async () => {
    expect(await service.search('smth')).toEqual([]);
  });

  it('check addTransaction method: unexisting category error', async () => {
    expect(
      await service.addTransaction({
        datetime: new Date(),
        amount: 1_00,
        transactionCategoryId: 'fakeId',
        currencyId: fakeBaseCurrency.id,
        description: '',
      }),
    ).toBe(null);
  });

  it('check addTransaction method: unexisting currency error', async () => {
    expect(
      await service.addTransaction({
        datetime: new Date(),
        amount: 1_00,
        transactionCategoryId: firstCategory.id,
        currencyId: 'fakeId',
        description: '',
      }),
    ).toBe(null);
  });

  it('check addTransaction method', async () => {
    expect(
      await service.addTransaction({
        datetime: now,
        amount: 1_00,
        transactionCategoryId: firstCategory.id,
        currencyId: fakeBaseCurrency.id,
        description: '',
      }),
    ).toEqual({
      amount: 100,
      currency: {
        code: 'EUR',
        id: '2',
        name: 'EUR',
      },
      datetime: now,
      description: null,
      id: 'fakeId',
      owner: {
        id: 'fakeId',
      },
      transactionCategory: {
        id: '1',
        isOutcome: true,
        isSystem: true,
        name: '',
        owner: null,
        parentCategory: null,
      },
    });
  });

  it('check updateTransaction method: unexisting category error', async () => {
    expect(
      await service.updateTransaction(
        {
          amount: 100,
          currency: {
            code: 'EUR',
            id: '2',
            name: 'EUR',
          },
          datetime: now,
          description: null,
          id: 'fakeId',
          owner: {
            id: 'fakeId',
          },
          transactionCategory: {
            id: '1',
            isOutcome: true,
            isSystem: true,
            name: '',
            owner: null,
            parentCategory: null,
          },
        },
        {
          transactionCategoryId: 'fakeId',
          datetime: now,
          amount: 100,
          currencyId: fakeBaseCurrency.id,
          description: '',
        },
      ),
    ).toBe(null);
  });

  it('check updateTransaction method: unexisting currency error', async () => {
    expect(
      await service.updateTransaction(
        {
          amount: 100,
          currency: {
            code: 'EUR',
            id: '2',
            name: 'EUR',
          },
          datetime: now,
          description: null,
          id: 'fakeId',
          owner: {
            id: 'fakeId',
          },
          transactionCategory: {
            id: '1',
            isOutcome: true,
            isSystem: true,
            name: '',
            owner: null,
            parentCategory: null,
          },
        },
        {
          transactionCategoryId: firstCategory.id,
          datetime: now,
          amount: 100,
          currencyId: 'fakeId',
          description: '',
        },
      ),
    ).toBe(null);
  });

  it('check updateTransaction method', async () => {
    expect(
      await service.updateTransaction(
        {
          amount: 100,
          currency: {
            code: 'EUR',
            id: '2',
            name: 'EUR',
          },
          datetime: now,
          description: null,
          id: 'fakeId',
          owner: {
            id: 'fakeId',
          },
          transactionCategory: {
            id: '1',
            isOutcome: true,
            isSystem: true,
            name: '',
            owner: null,
            parentCategory: null,
          },
        },
        {
          transactionCategoryId: firstCategory.id,
          datetime: now,
          amount: 100_00,
          currencyId: fakeBaseCurrency.id,
          description: '',
        },
      ),
    ).toEqual({
      amount: 100_00,
      currency: {
        code: 'EUR',
        id: '2',
        name: 'EUR',
      },
      datetime: now,
      description: '',
      id: 'fakeId',
      owner: {
        id: 'fakeId',
      },
      transactionCategory: {
        id: '1',
        isOutcome: true,
        isSystem: true,
        name: '',
        owner: null,
        parentCategory: null,
      },
    });
  });

  it('check deleteTransaction method', async () => {
    expect(
      await service.deleteTransaction({
        amount: 100_00,
        currency: {
          code: 'EUR',
          id: '2',
          name: 'EUR',
        },
        datetime: now,
        description: '',
        id: 'fakeId',
        owner: {
          id: 'fakeId',
        },
        transactionCategory: {
          id: '1',
          isOutcome: true,
          isSystem: true,
          name: '',
          owner: null,
          parentCategory: null,
        },
      }),
    ).toEqual({
      amount: 100_00,
      currency: {
        code: 'EUR',
        id: '2',
        name: 'EUR',
      },
      datetime: now,
      description: '',
      id: 'fakeId',
      owner: {
        id: 'fakeId',
      },
      transactionCategory: {
        id: '1',
        isOutcome: true,
        isSystem: true,
        name: '',
        owner: null,
        parentCategory: null,
      },
    });
  });

  it('getTransactionsCountBy', async () => {
    expect(
      await service.getTransactionsCountBy(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
      ),
    ).toBe(10);
  });

  it('getTransactionsSumBy', async () => {
    expect(
      await service.getTransactionsSumBy(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
        fakeBaseCurrency,
      ),
    ).toBe(500_04);
  });

  it('getTransactionsCountForDateRange', async () => {
    expect(
      await service.getTransactionsCountForDateRange(
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
      ),
    ).toBe(10);
  });

  it('getTransactionsSumForDateRange', async () => {
    expect(
      await service.getTransactionsSumForDateRange(
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
        fakeBaseCurrency,
      ),
    ).toBe(500_04);
  });

  it('getTransactionCountRatioByCategories', async () => {
    expect(
      await service.getTransactionCountRatioByCategories(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
      ),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });

  it('getTransactionSumRatioByCategories', async () => {
    expect(
      await service.getTransactionSumRatioByCategories(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
        fakeBaseCurrency,
      ),
    ).toEqual({ '2': 0, '3': 0, '4': 0 });
  });

  it('getTransactionCountChangeByPeriod', async () => {
    expect(
      await service.getTransactionCountChangeByPeriod(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
        Period.YEAR,
      ),
    ).toEqual({
      '2017-9-30': 5,
      '2018-9-30': 5,
    });
  });

  it('getTransactionSumChangeByPeriod', async () => {
    expect(
      await service.getTransactionSumChangeByPeriod(
        firstCategory,
        dateStartForTransactionChangeMetrics,
        dateEndForTransactionChangeMetrics,
        Period.YEAR,
        fakeBaseCurrency,
      ),
    ).toEqual({
      '2017-9-30': 25002,
      '2018-9-30': 25002,
    });
  });
});
