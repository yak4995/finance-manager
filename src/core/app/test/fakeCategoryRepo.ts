import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';

export const firstCategory: ITransactionCategory = {
  id: '1',
  name: '',
  parentCategory: null,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const secondCategory: ITransactionCategory = {
  id: '2',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const thirdCategory: ITransactionCategory = {
  id: '3',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const fourthCategory: ITransactionCategory = {
  id: '4',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const fifthCategory: ITransactionCategory = {
  id: '5',
  name: '',
  parentCategory: secondCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const sixthCategory: ITransactionCategory = {
  id: '6',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const seventhCategory: ITransactionCategory = {
  id: '7',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};
