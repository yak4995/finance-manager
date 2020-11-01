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
  '28.01.2019': 0,
  '28.02.2018': 0,
  '28.02.2019': 0,
  '28.03.2018': 0,
  '28.03.2019': 0,
  '28.04.2018': 0,
  '28.04.2019': 0,
  '28.05.2018': 0,
  '28.05.2019': 0,
  '28.06.2018': 0,
  '28.06.2019': 0,
  '28.07.2018': 0,
  '28.07.2019': 0,
  '28.08.2018': 0,
  '28.08.2019': 0,
  '28.09.2018': 0,
  '28.09.2019': 0,
  '28.10.2018': 0,
  '28.10.2019': 0,
  '28.11.2018': 0,
  '28.12.2018': 0,
  '30.01.2018': 0,
  '30.10.2017': 0,
  '30.11.2017': 0,
  '30.12.2017': 0,
};

/* istanbul ignore next */
export const getTransactionCountChangeByYearPeriodResult: TransactionsComparisonDto = {
  '30.03.2018': 0,
  '30.03.2019': 0,
  '30.06.2018': 0,
  '30.06.2019': 0,
  '30.09.2018': 0,
  '30.09.2019': 0,
  '30.12.2017': 0,
  '30.12.2018': 0,
};

/* istanbul ignore next */
export const getTransactionSumChangeByQuarterPeriodResult: TransactionsComparisonDto = {
  '28.01.2019': 0,
  '28.02.2018': 0,
  '28.02.2019': 0,
  '28.03.2018': 0,
  '28.03.2019': 0,
  '28.04.2018': 0,
  '28.04.2019': 0,
  '28.05.2018': 0,
  '28.05.2019': 0,
  '28.06.2018': 0,
  '28.06.2019': 0,
  '28.07.2018': 0,
  '28.07.2019': 0,
  '28.08.2018': 0,
  '28.08.2019': 0,
  '28.09.2018': 0,
  '28.09.2019': 0,
  '28.10.2018': 0,
  '28.10.2019': 0,
  '28.11.2018': 0,
  '28.12.2018': 0,
  '30.01.2018': 0,
  '30.10.2017': 0,
  '30.11.2017': 0,
  '30.12.2017': 0,
};

/* istanbul ignore next */
export const getTransactionSumChangeByYearPeriodResult: TransactionsComparisonDto = {
  '30.03.2018': 0,
  '30.03.2019': 0,
  '30.06.2018': 0,
  '30.06.2019': 0,
  '30.09.2018': 0,
  '30.09.2019': 0,
  '30.12.2017': 0,
  '30.12.2018': 0,
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
