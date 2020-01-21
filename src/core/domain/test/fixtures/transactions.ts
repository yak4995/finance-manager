import { fakeCurrency, fakeBaseCurrency } from './currencies';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  sixthCategory,
  seventhCategory,
} from './transactionCategories';
import ITransaction from '../../transactions/entities/transaction.interface';
import { TransactionsComparisonDto } from '../../transactions/dto/transactionsComparison.dto';

export const generateTransactionsForCountMetrics: (
  date: Date,
) => ITransaction[] = (date: Date): ITransaction[] => [
  {
    id: '1',
    currency: fakeCurrency,
    owner: null,
    transactionCategory: thirdCategory,
    datetime: date,
    amount: 100_00,
  },
  {
    id: '2',
    currency: fakeBaseCurrency,
    owner: null,
    transactionCategory: secondCategory,
    datetime: date,
    amount: 5_01,
  },
];

export const generateTransactionsForSumMetrics: (
  date: Date,
) => ITransaction[] = (date: Date): ITransaction[] => [
  {
    id: '1',
    currency: fakeCurrency,
    owner: null,
    transactionCategory: thirdCategory,
    datetime: date,
    amount: 100_00,
  },
  {
    id: '2',
    currency: fakeBaseCurrency,
    owner: null,
    transactionCategory: thirdCategory,
    datetime: date,
    amount: 5_01,
  },
  {
    id: '3',
    currency: fakeBaseCurrency,
    owner: null,
    transactionCategory: secondCategory,
    datetime: date,
    amount: 5_01,
  },
];

export const generateTransactionsForRatioByCategories: (
  date: Date,
) => ITransaction[] = (date: Date): ITransaction[] => [
  {
    id: '1',
    currency: fakeCurrency,
    owner: null,
    transactionCategory: thirdCategory,
    datetime: date,
    amount: 100_00,
  },
  {
    id: '2',
    currency: fakeCurrency,
    owner: null,
    transactionCategory: sixthCategory,
    datetime: date,
    amount: 100_00,
  },
  {
    id: '3',
    currency: fakeBaseCurrency,
    owner: null,
    transactionCategory: seventhCategory,
    datetime: date,
    amount: 5_01,
  },
];

export const transactionForTransactionChangeMetrics: ITransaction[] = [
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

export const getTransactionCountChangeByMonthPeriodResult: TransactionsComparisonDto = {
  '2017-10-30': 0,
  '2017-11-30': 0,
  '2017-12-30': 1,
  '2017-9-30': 1,
  '2018-1-30': 0,
  '2018-10-2': 0,
  '2018-11-2': 0,
  '2018-12-2': 1,
  '2018-3-2': 1,
  '2018-4-2': 0,
  '2018-5-2': 0,
  '2018-6-2': 2,
  '2018-7-2': 0,
  '2018-8-2': 0,
  '2018-9-2': 1,
  '2019-1-2': 0,
  '2019-2-2': 0,
  '2019-3-2': 1,
  '2019-4-2': 0,
  '2019-5-2': 0,
  '2019-6-2': 2,
  '2019-7-2': 0,
  '2019-8-2': 0,
  '2019-9-2': 0,
};

export const getTransactionCountChangeByQuarterPeriodResult: TransactionsComparisonDto = {
  '2017-12-30': 1,
  '2017-9-30': 1,
  '2018-12-30': 1,
  '2018-3-30': 2,
  '2018-6-30': 1,
  '2018-9-30': 1,
  '2019-3-30': 2,
  '2019-6-30': 1,
};

export const getTransactionCountChangeByYearPeriodResult: TransactionsComparisonDto = {
  '2017-9-30': 5,
  '2018-9-30': 5,
};

export const getTransactionSumChangeByMonthPeriodResult: TransactionsComparisonDto = {
  '2017-10-30': 0,
  '2017-11-30': 0,
  '2017-12-30': 5_01,
  '2017-9-30': 80_00,
  '2018-1-30': 0,
  '2018-10-2': 0,
  '2018-11-2': 0,
  '2018-12-2': 5_01,
  '2018-3-2': 80_00,
  '2018-4-2': 0,
  '2018-5-2': 0,
  '2018-6-2': 85_01,
  '2018-7-2': 0,
  '2018-8-2': 0,
  '2018-9-2': 80_00,
  '2019-1-2': 0,
  '2019-2-2': 0,
  '2019-3-2': 80_00,
  '2019-4-2': 0,
  '2019-5-2': 0,
  '2019-6-2': 85_01,
  '2019-7-2': 0,
  '2019-8-2': 0,
  '2019-9-2': 0,
};

export const getTransactionSumChangeByQuarterPeriodResult: TransactionsComparisonDto = {
  '2017-12-30': 5_01,
  '2017-9-30': 80_00,
  '2018-12-30': 5_01,
  '2018-3-30': 160_00,
  '2018-6-30': 5_01,
  '2018-9-30': 80_00,
  '2019-3-30': 160_00,
  '2019-6-30': 5_01,
};

export const getTransactionSumChangeByYearPeriodResult: TransactionsComparisonDto = {
  '2017-9-30': 250_02,
  '2018-9-30': 250_02,
};

export const generateTransactionsForSearch: (
  datetime: Date,
) => ITransaction[] = (datetime: Date): ITransaction[] => [
  {
    id: 'abc',
    amount: 0,
    currency: fakeBaseCurrency,
    datetime,
    owner: { id: 'fakeId' },
    transactionCategory: firstCategory,
    description: 'smth',
  },
];
