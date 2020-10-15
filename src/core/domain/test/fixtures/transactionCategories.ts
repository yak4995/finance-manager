import ITransactionCategory from '../../transactionCategories/entities/transactionCategory.interface';

/* istanbul ignore next */
export const firstCategory: ITransactionCategory = {
  id: '1',
  name: '',
  parentCategory: null,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const secondCategory: ITransactionCategory = {
  id: '2',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const thirdCategory: ITransactionCategory = {
  id: '3',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const fourthCategory: ITransactionCategory = {
  id: '4',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const fifthCategory: ITransactionCategory = {
  id: '5',
  name: '',
  parentCategory: secondCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const sixthCategory: ITransactionCategory = {
  id: '6',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const seventhCategory: ITransactionCategory = {
  id: '7',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

/* istanbul ignore next */
export const testCategoriesChildrenMap: Array<[
  string,
  ITransactionCategory,
  string[],
]> = [
  [firstCategory.id, firstCategory, ['1', '2', '3', '4', '5', '6', '7']],
  [thirdCategory.id, thirdCategory, ['3', '6', '7']],
];

/* istanbul ignore next */
export const transactionCategoriesForSearch: ITransactionCategory[] = [
  {
    id: 'abc',
    isSystem: false,
    parentCategory: null,
    owner: { id: 'fakeId' },
    name: 'smth',
    isOutcome: true,
  },
];
