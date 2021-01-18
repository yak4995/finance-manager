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

/* istanbul ignore next */
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

/* istanbul ignore next */
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

/* istanbul ignore next */
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

/* istanbul ignore next */
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

/* istanbul ignore next */
export const getTransactionCountChangeByQuarterPeriodResult: TransactionsComparisonDto = {
  '2017-09-29': 1,
  '2017-10-29': 0,
  '2017-11-29': 0,
  '2017-12-29': 1,
  '2018-01-29': 0,
  '2018-02-27': 0,
  '2018-03-27': 1,
  '2018-04-27': 0,
  '2018-05-27': 1,
  '2018-06-27': 1,
  '2018-07-27': 0,
  '2018-08-27': 0,
  '2018-09-27': 1,
  '2018-10-27': 0,
  '2018-11-27': 0,
  '2018-12-27': 1,
  '2019-01-27': 0,
  '2019-02-27': 0,
  '2019-03-27': 1,
  '2019-04-27': 0,
  '2019-05-27': 1,
  '2019-06-27': 1,
  '2019-07-27': 0,
  '2019-08-27': 0,
  '2019-09-27': 0,
};

/* istanbul ignore next */
export const getTransactionCountChangeByYearPeriodResult: TransactionsComparisonDto = {
  '2017-09-29': 1,
  '2017-12-29': 1,
  '2018-03-29': 2,
  '2018-06-29': 1,
  '2018-09-29': 1,
  '2018-12-29': 1,
  '2019-03-29': 2,
  '2019-06-29': 1,
};

/* istanbul ignore next */
export const getTransactionSumChangeByQuarterPeriodResult: TransactionsComparisonDto = {
  '2019-01-27': 0,
  '2018-02-27': 0,
  '2019-02-27': 0,
  '2018-03-27': 8000,
  '2019-03-27': 8000,
  '2018-04-27': 0,
  '2019-04-27': 0,
  '2018-05-27': 8000,
  '2019-05-27': 8000,
  '2018-06-27': 501,
  '2019-06-27': 501,
  '2018-07-27': 0,
  '2019-07-27': 0,
  '2018-08-27': 0,
  '2019-08-27': 0,
  '2018-09-27': 8000,
  '2019-09-27': 0,
  '2018-10-27': 0,
  '2018-11-27': 0,
  '2018-12-27': 501,
  '2018-01-29': 0,
  '2017-09-29': 8000,
  '2017-10-29': 0,
  '2017-11-29': 0,
  '2017-12-29': 501,
};

/* istanbul ignore next */
export const getTransactionSumChangeByYearPeriodResult: TransactionsComparisonDto = {
  '2018-03-29': 16000,
  '2019-03-29': 16000,
  '2018-06-29': 501,
  '2019-06-29': 501,
  '2017-09-29': 8000,
  '2018-09-29': 8000,
  '2017-12-29': 501,
  '2018-12-29': 501,
};

/* istanbul ignore next */
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
