import IRepository from '../repository.interface';
import ITransactionCategory from '../transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryService from '../transactionCategories/services/transactionCategoryService';

import FakeRepo from './mocks/fakeRepo';

import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
  testCategoriesChildrenMap,
} from './fixtures/transactionCategories';

describe('TransactionCategoryService tests', () => {
  const tcRepo: IRepository<ITransactionCategory> = new FakeRepo([
    firstCategory,
    secondCategory,
    thirdCategory,
    fourthCategory,
    fifthCategory,
    sixthCategory,
    seventhCategory,
  ]);
  const service: TransactionCategoryService = new TransactionCategoryService(
    tcRepo,
  );

  it('check methods existance', () => {
    expect(service.getTransactionCategoryChildren).toBeDefined();
    expect(service.getTransactionCategoryDirectChildren).toBeDefined();
  });

  it.each(testCategoriesChildrenMap)(
    'check getTransactionCategoryChildren method: for test category %s',
    async (
      categoryId: string,
      category: ITransactionCategory,
      categoryChildrenIds: string[],
    ): Promise<void> => {
      try {
        expect(
          (await service.getTransactionCategoryChildren(category)).map(
            (r: ITransactionCategory): string => r.id,
          ),
        ).toEqual(categoryChildrenIds);
      } catch (e) {
        throw e;
      }
    },
  );

  it('check getTransactionCategoryDirectChildren method', async () => {
    try {
      let result: string[] = (
        await service.getTransactionCategoryDirectChildren(firstCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['2', '3', '4']);
    } catch (e) {
      throw e;
    }
  });
});
