import 'ts-jest';

import IRepository, {
  OrderCriteria,
  Criteria,
} from '../../domain/repository.interface';
import ITransaction from '../../domain/transactions/entities/transaction.interface';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';
import ICurrency from '../../domain/transactions/entities/currency.interface';
import TransactionCategoryAbstractFactory from '../../domain/transactions/factories/transactionCategoryFactory';
import TransactionAbstractFactory from '../../domain/transactions/factories/transactionFactory';
import CurrencyAbstractFactory from '../../domain/transactions/factories/currencyFactory';
import { Period } from '../../domain/period/enums/period.enum';
import ISearchService from '../search/searchService.interface';
import ICurrencyConverterService from '../../domain/transactions/services/currencyConverterService.interface';
import TransactionAnalyticService from '../../domain/transactions/services/transactionAnalyticService';
import TransactionCategoryService from '../../domain/transactions/services/transactionCategoryService';
import TransactionInteractor from '../transactions/interactors/transaction.interactor';
import TransactionOutputPort from '../transactions/ports/transactionOutput.port';

import FakeCurrencyConverter from '../../domain/test/mocks/fakeCurrencyConverter';
import FakeTransactionFactory from './mocks/fakeTransactionFactory';
import FakeTransactionCategoryFactory from './mocks/fakeTransactionCategoryFactory';
import FakeCurrencyFactory from './mocks/fakeCurrencyFactory';
import FakeSearchService from './mocks/FakeSearchService';
import FakeTransactionOutputPort from './mocks/fakeTransactionOutputPort';

import {
  fakeBaseCurrency,
  fakeCurrency,
} from '../../domain/test/fixtures/currencies';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from '../../domain/test/fixtures/transactionCategories';
import {
  transactionForTransactionChangeMetrics,
  generateTransactionsForSearch,
} from '../../domain/test/fixtures/transactions';
import {
  dateStartForTransactionChangeMetrics,
  dateEndForTransactionChangeMetrics,
} from '../../domain/test/fixtures/dateRanges';

describe('TransactionInteractor tests', () => {
  const now: Date = new Date();
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
        getInstance: (fields: Criteria<ITransactionCategory>) => ({
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
  const transactionSet: ITransaction[] = transactionForTransactionChangeMetrics.map(
    (t: ITransaction): ITransaction => {
      t.owner = { id: 'fakeId' };
      return t;
    },
  );
  TransactionAbstractFactory.setInstance(
    new FakeTransactionFactory(transactionSet, {
      getInstance: (fields: Criteria<ITransaction>) => ({
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
  CurrencyAbstractFactory.setInstance(
    new FakeCurrencyFactory([fakeCurrency, fakeBaseCurrency], {
      getInstance: (fields: Criteria<ICurrency>) => null,
    }),
  );
  const fakeTransactionFactory: TransactionAbstractFactory = FakeTransactionFactory.getInstance();
  const fakeTransactionCategoryFactory: TransactionCategoryAbstractFactory = FakeTransactionCategoryFactory.getInstance();
  const fakeCurrencyFactory: CurrencyAbstractFactory = FakeCurrencyFactory.getInstance();
  const fakeTransactionCategoryRepo: IRepository<ITransactionCategory> = fakeTransactionCategoryFactory.createTransactionCategoryRepo();
  const transactionCategoryService: TransactionCategoryService = new TransactionCategoryService(
    fakeTransactionCategoryRepo,
  );
  const fakeTransactionRepo: IRepository<ITransaction> = fakeTransactionFactory.createTransactionRepo();
  const fakeCurrencyConverter: ICurrencyConverterService = new FakeCurrencyConverter();
  const transactionAnalyticservice: TransactionAnalyticService = new TransactionAnalyticService(
    transactionSet,
    fakeCurrencyConverter,
    transactionCategoryService,
  );
  const fakeCurrencyRepo: IRepository<ICurrency> = fakeCurrencyFactory.createCurrencyRepo();
  const fakeTransactionsSearchService: ISearchService<ITransaction> = new FakeSearchService<
    ITransaction
  >(generateTransactionsForSearch(now));
  const fakeTransactionOutputPort: TransactionOutputPort = new FakeTransactionOutputPort();
  const service: TransactionInteractor = new TransactionInteractor(
    { id: 'fakeId' },
    fakeTransactionFactory,
    transactionCategoryService,
    fakeTransactionCategoryRepo,
    fakeTransactionRepo,
    fakeCurrencyRepo,
    transactionAnalyticservice,
    fakeTransactionsSearchService,
    fakeTransactionOutputPort,
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
    try {
      await service.getTransactionDetail('fakeId');
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check getTransactionDetail method', async () => {
    expect(await service.getTransactionDetail('1')).toEqual(transactionSet[0]);
  });

  it('check getTransactions method: smth error', async () => {
    jest
      .spyOn(fakeTransactionRepo, 'findAll')
      .mockImplementationOnce(
        (
          page: number,
          perPage: number,
          orderBy: OrderCriteria<ITransaction>,
          searchCriteria: Criteria<ITransaction>,
        ) => {
          throw new Error('findAll exception');
        },
      );
    try {
      await service.getTransactions(1, 2, { id: 'ASC' });
    } catch (e) {
      expect(e.message).toBe('findAll exception');
    }
    jest.spyOn(fakeTransactionRepo, 'findAll').mockClear();
  });

  it('check getTransactions method', async () => {
    expect(await service.getTransactions(1, 2, { id: 'ASC' })).toEqual([
      transactionSet[0],
      transactionSet[9],
    ]);
  });

  it('check getTransactionsByCategory method', async () => {
    jest
      .spyOn(transactionCategoryService, 'getTransactionCategoryChildren')
      .mockImplementationOnce((parentCategory: ITransactionCategory) => {
        throw new Error('Incorrect category exception');
      });
    try {
      await service.getTransactionsByCategory(
        new Date('2017-10-01 00:00:00'),
        new Date('2018-01-01 00:00:00'),
        firstCategory,
      );
    } catch (e) {
      expect(e.message).toBe('Incorrect category exception');
    }
    jest
      .spyOn(transactionCategoryService, 'getTransactionCategoryChildren')
      .mockClear();
  });

  it('check getTransactionsByCategory method', async () => {
    expect(
      await service.getTransactionsByCategory(
        new Date('2017-10-01 00:00:00'),
        new Date('2018-01-01 00:00:00'),
        firstCategory,
      ),
    ).toEqual([transactionSet[0], transactionSet[1]]);
  });

  it('check search method: search error', async () => {
    try {
      await service.search('wrong');
    } catch (e) {
      expect(e.message).toBe('Incorrect content');
    }
  });

  it('check search method', async () => {
    expect(await service.search('smth')).toEqual([
      {
        id: 'abc',
        amount: 0,
        currency: fakeBaseCurrency,
        datetime: now,
        owner: { id: 'fakeId' },
        transactionCategory: firstCategory,
        description: 'smth',
      },
    ]);
  });

  it('check addTransaction method: unexisting category error', async () => {
    try {
      await service.addTransaction({
        datetime: new Date(),
        amount: 1_00,
        transactionCategoryId: 'fakeId',
        currencyId: fakeBaseCurrency.id,
        description: '',
      });
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check addTransaction method: unexisting currency error', async () => {
    try {
      await service.addTransaction({
        datetime: new Date(),
        amount: 1_00,
        transactionCategoryId: firstCategory.id,
        currencyId: 'fakeId',
        description: '',
      });
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
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
    try {
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
      );
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check updateTransaction method: unexisting currency error', async () => {
    try {
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
      );
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
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

  it('check deleteTransaction method: some deletion error', async () => {
    jest
      .spyOn(fakeTransactionRepo, 'delete')
      .mockImplementationOnce((deleteCriteria: Criteria<ITransaction>) => {
        throw new Error('Deletion error');
      });
    try {
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
      });
    } catch (e) {
      expect(e.message).toBe('Deletion error');
    }
    jest.spyOn(fakeTransactionRepo, 'delete').mockClear();
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
      '30.09.2017': 5,
      '30.09.2018': 5,
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
      '30.09.2017': 250_02,
      '30.09.2018': 250_02,
    });
  });
});
