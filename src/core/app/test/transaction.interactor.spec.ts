import 'ts-jest';
import TransactionInteractor from '../transactions/interactors/transaction.interactor';
import TransactionAnalyticService from '../../domain/transactions/services/transactionAnalyticService';
import TransactionCategoryService from '../../domain/transactions/services/transactionCategoryService';
import FakeCurrencyConverter from '../../domain/test/fakeCurrencyConverter';
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
import ICurrency from '../../domain/transactions/entities/currency.interface';
import FakeRepo from '../../domain/test/fakeRepo';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';

describe('TransactionInteractor tests', () => {
  const now: Date = new Date();

  const fakeCurrency: ICurrency = {
    id: '1',
    name: 'USD',
    code: 'USD',
  };

  const fakeBaseCurrency: ICurrency = {
    id: '2',
    name: 'EUR',
    code: 'EUR',
  };

  const transactionAnalyticservice: TransactionAnalyticService = new TransactionAnalyticService(
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

  const dateStartForTransactionChangeMetrics: Date = new Date(
    '2017-09-30 00:00:00',
  );
  const dateEndForTransactionChangeMetrics: Date = new Date(
    '2019-09-30 00:00:00',
  );
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
    const service: TransactionInteractor = new TransactionInteractor(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
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
});
