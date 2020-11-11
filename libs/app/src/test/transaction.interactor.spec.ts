import ISearchService from '../search/searchService.interface';
import TransactionInteractor from '../transactions/interactors/transaction.interactor';
import TransactionOutputPort from '../transactions/ports/transactionOutput.port';

// mocks
import FakeTransactionFactory from './mocks/fakeTransactionFactory';
import FakeTransactionCategoryFactory from './mocks/fakeTransactionCategoryFactory';
import FakeCurrencyFactory from './mocks/fakeCurrencyFactory';
import FakeSearchService from './mocks/FakeSearchService';
import FakeTransactionOutputPort from './mocks/fakeTransactionOutputPort';
import FakeCurrenciesFacade from './mocks/fakeCurrenciesFacade';
import FakeTransactionCategoriesFacade from './mocks/fakeTransactionCategoriesFacade';
import FakeCurrencyConverter from '../../../domain/src/test/mocks/fakeCurrencyConverter';

// fixtures
import {
  fakeBaseCurrency,
  fakeCurrency,
} from '../../../domain/src/test/fixtures/currencies';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from '../../../domain/src/test/fixtures/transactionCategories';
import {
  transactionForTransactionChangeMetrics,
  generateTransactionsForSearch,
} from '../../../domain/src/test/fixtures/transactions';
import {
  dateStartForTransactionChangeMetrics,
  dateEndForTransactionChangeMetrics,
} from '../../../domain/src/test/fixtures/dateRanges';

import ITransactionCategoriesFacade from '../../../domain/src/transactionCategories/transactionCategories.facade';
import ICurrenciesFacade from '../../../domain/src/currencies/currencies.facade';
import TransactionCategoryAbstractFactory from '../../../domain/src/transactionCategories/factories/transactionCategoryFactory';
import CurrencyAbstractFactory from '../../../domain/src/currencies/factories/currencyFactory';
import IRepository, {
  Criteria,
} from '../../../domain/src/repository.interface';
import ITransactionCategory from '../../../domain/src/transactionCategories/entities/transactionCategory.interface';
import ITransaction from '../../../domain/src/transactions/entities/transaction.interface';
import ICurrency from '../../../domain/src/currencies/entities/currency.interface';
import TransactionCategoryService from '../../../domain/src/transactionCategories/services/transactionCategoryService';
import TransactionAbstractFactory from '../../../domain/src/transactions/factories/transactionFactory';
import ICurrencyConverterService from '../../../domain/src/currencies/services/currencyConverterService.interface';
import TransactionAnalyticService from '../../../domain/src/transactions/services/transactionAnalyticService';
import { Period } from '../../../domain/src/period/enums/period.enum';

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
  CurrencyAbstractFactory.setInstance(
    new FakeCurrencyFactory([fakeCurrency, fakeBaseCurrency], {
      getInstance: (fields: Criteria<ICurrency>): ICurrency => null,
    }),
  );
  const fakeTransactionCategoryFactory: TransactionCategoryAbstractFactory = FakeTransactionCategoryFactory.getInstance();
  const fakeTransactionCategoryRepo: IRepository<ITransactionCategory> = fakeTransactionCategoryFactory.createTransactionCategoryRepo();
  const fakeCurrencyFactory: CurrencyAbstractFactory = FakeCurrencyFactory.getInstance();
  const transactionCategoryService: TransactionCategoryService = new TransactionCategoryService(
    fakeTransactionCategoryRepo,
  );
  const fakeTransactionCategoriesFacade: ITransactionCategoriesFacade = new FakeTransactionCategoriesFacade(
    transactionCategoryService,
    fakeTransactionCategoryFactory,
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
  const fakeTransactionFactory: TransactionAbstractFactory = FakeTransactionFactory.getInstance();
  const fakeTransactionRepo: IRepository<ITransaction> = fakeTransactionFactory.createTransactionRepo();
  const fakeCurrencyConverter: ICurrencyConverterService = new FakeCurrencyConverter();
  const fakeCurrenciesFacade: ICurrenciesFacade = new FakeCurrenciesFacade(
    fakeCurrencyFactory,
    fakeCurrencyConverter,
  );
  const transactionAnalyticService: TransactionAnalyticService = new TransactionAnalyticService(
    transactionSet,
    fakeCurrenciesFacade,
    fakeTransactionCategoriesFacade,
  );
  const fakeTransactionsSearchService: ISearchService<ITransaction> = new FakeSearchService<
    ITransaction
  >(generateTransactionsForSearch(now));
  const fakeTransactionOutputPort: TransactionOutputPort = new FakeTransactionOutputPort();
  const service: TransactionInteractor = new TransactionInteractor(
    fakeTransactionFactory,
    fakeTransactionCategoriesFacade,
    fakeCurrenciesFacade,
    transactionAnalyticService,
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
    expect(service.getMaxTransactionByCategory).toBeDefined();
    expect(service.getMinTransactionByCategory).toBeDefined();
    expect(service.getTransactionsCountBy).toBeDefined();
    expect(service.getTransactionsSumBy).toBeDefined();
    expect(service.getTransactionsCount).toBeDefined();
    expect(service.getTransactionsSum).toBeDefined();
    expect(service.getTransactionCountRatioByCategories).toBeDefined();
    expect(service.getTransactionSumRatioByCategories).toBeDefined();
    expect(service.getTransactionCountChangeByPeriod).toBeDefined();
    expect(service.getTransactionSumChangeByPeriod).toBeDefined();
  });

  it('check getTransactionDetail method: Such entity has not been found error', async () => {
    try {
      await service.getTransactionDetail({ id: 'fakeId' }, 'fakeId');
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check getTransactionDetail method', async () => {
    expect(await service.getTransactionDetail({ id: 'fakeId' }, '1')).toEqual(
      transactionSet[0],
    );
  });

  it('check getTransactions method: smth error', async () => {
    jest
      .spyOn(fakeTransactionRepo, 'findAll')
      .mockReturnValueOnce(Promise.reject(new Error('findAll exception')));
    try {
      await service.getTransactions({ id: 'fakeId' }, 1, 2, { id: 'ASC' });
    } catch (e) {
      expect(e.message).toBe('findAll exception');
    }
    jest.spyOn(fakeTransactionRepo, 'findAll').mockClear();
  });

  it('check getTransactions method', async () => {
    expect(
      await service.getTransactions({ id: 'fakeId' }, 1, 2, { id: 'ASC' }),
    ).toEqual([transactionSet[0], transactionSet[9]]);
  });

  it('check getTransactionsByCategory method', async () => {
    jest
      .spyOn(transactionCategoryService, 'getTransactionCategoryChildren')
      .mockReturnValueOnce(
        Promise.reject(new Error('Incorrect category exception')),
      );
    try {
      await service.getTransactionsByCategory(
        { id: 'fakeId' },
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
        { id: 'fakeId' },
        new Date('2017-10-01 00:00:00'),
        new Date('2018-01-01 00:00:00'),
        firstCategory,
      ),
    ).toEqual([transactionSet[0], transactionSet[1]]);
  });

  it('check search method: search error', async () => {
    try {
      await service.search({ id: 'fakeId' }, 'wrong');
    } catch (e) {
      expect(e.message).toBe('Incorrect content');
    }
  });

  it('check search method', async () => {
    expect(await service.search({ id: 'fakeId' }, 'smth')).toEqual([
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
      await service.addTransaction(
        { id: 'fakeId' },
        {
          datetime: new Date(),
          amount: 1_00,
          transactionCategoryId: 'fakeId',
          currencyId: fakeBaseCurrency.id,
          description: '',
        },
      );
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check addTransaction method: unexisting currency error', async () => {
    try {
      await service.addTransaction(
        { id: 'fakeId' },
        {
          datetime: new Date(),
          amount: 1_00,
          transactionCategoryId: firstCategory.id,
          currencyId: 'fakeId',
          description: '',
        },
      );
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
    }
  });

  it('check addTransaction method', async () => {
    expect(
      await service.addTransaction(
        { id: 'fakeId' },
        {
          datetime: now,
          amount: 1_00,
          transactionCategoryId: firstCategory.id,
          currencyId: fakeBaseCurrency.id,
          description: '',
        },
      ),
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
        { id: 'fakeId' },
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
        { id: 'fakeId' },
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
        { id: 'fakeId' },
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
      .mockReturnValueOnce(Promise.reject(new Error('Deletion error')));
    try {
      await service.deleteTransaction(
        { id: 'fakeId' },
        {
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
        },
      );
    } catch (e) {
      expect(e.message).toBe('Deletion error');
    }
    jest.spyOn(fakeTransactionRepo, 'delete').mockClear();
  });

  it('check deleteTransaction method', async () => {
    expect(
      await service.deleteTransaction(
        { id: 'fakeId' },
        {
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

  it('getMaxTransactionByCategory', async () => {
    expect(await service.getMaxTransactionByCategory(firstCategory)).toEqual({
      amount: 10000,
      currency: {
        code: 'USD',
        id: '1',
        name: 'USD',
      },
      datetime: new Date('2017-09-30T21:00:00.000Z'),
      id: '1',
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

  it('getMinTransactionByCategory', async () => {
    expect(await service.getMinTransactionByCategory(firstCategory)).toEqual({
      amount: 501,
      currency: {
        code: 'EUR',
        id: '2',
        name: 'EUR',
      },
      datetime: new Date('2017-12-31T22:00:00.000Z'),
      id: '2',
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
    expect(await service.getTransactionsCountBy(firstCategory)).toBe(10);
  });

  it('getTransactionsSumBy', async () => {
    expect(
      await service.getTransactionsSumBy(firstCategory, fakeBaseCurrency),
    ).toBe(500_04);
  });

  it('getTransactionsCount', async () => {
    expect(await service.getTransactionsCount()).toBe(10);
  });

  it('getTransactionsSumForDateRange', async () => {
    expect(await service.getTransactionsSum(fakeBaseCurrency)).toBe(500_04);
  });

  it('getTransactionCountRatioByCategories', async () => {
    expect(
      await service.getTransactionCountRatioByCategories(firstCategory),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
  });

  it('getTransactionSumRatioByCategories', async () => {
    expect(
      await service.getTransactionSumRatioByCategories(
        firstCategory,
        fakeBaseCurrency,
      ),
    ).toEqual({ '1': 100, '2': 0, '3': 0, '4': 0 });
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
      '30.03.2018': 2,
      '30.03.2019': 2,
      '30.06.2018': 1,
      '30.06.2019': 1,
      '30.09.2017': 1,
      '30.09.2018': 1,
      '30.12.2017': 1,
      '30.12.2018': 1,
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
      '30.03.2018': 16000,
      '30.03.2019': 16000,
      '30.06.2018': 501,
      '30.06.2019': 501,
      '30.09.2017': 8000,
      '30.09.2018': 8000,
      '30.12.2017': 501,
      '30.12.2018': 501,
    });
  });
});
