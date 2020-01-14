import 'ts-jest';
import TransactionCategoryInteractor from '../transactions/interactors/transactionCategory.interactor';
import FakeEntityFactory from './fakeEntityFactory';
import FakeSearchService from './FakeSearchService';
import FakeTransactionCategoryOutputPort from './fakeTransactionCategoryOutputPort';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from './fakeCategoryRepo';
import FakeRepo from '../../domain/test/fakeRepo';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';
import IRepository, { Criteria } from '../../domain/repository.interface';

describe('TransactionCategoryInteractor tests', () => {
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
  const service: TransactionCategoryInteractor = new TransactionCategoryInteractor(
    FakeEntityFactory.getInstance(),
    fakeTransactionCategoryRepo,
    new FakeSearchService<ITransactionCategory>([
      {
        id: 'abc',
        isSystem: false,
        parentCategory: null,
        owner: { id: 'fakeId' },
        name: 'smth',
        isOutcome: true,
      },
    ]),
    new FakeTransactionCategoryOutputPort(),
  );

  it('check methods existance', () => {
    expect(service.getTopCategories).toBeDefined();
    expect(service.getCategoryDirectChildren).toBeDefined();
    expect(service.getOwnCategories).toBeDefined();
    expect(service.search).toBeDefined();
    expect(service.addCategory).toBeDefined();
    expect(service.updateCategory).toBeDefined();
    expect(service.deleteCategory).toBeDefined();
  });

  it('check getTopCategories method', async () => {
    expect(
      (await service.getTopCategories({ id: 'fakeId' })).map(
        (r: ITransactionCategory): string => r.id,
      ),
    ).toEqual(['1']);
  });

  it('check getCategoryDirectChildren method', async () => {
    expect(
      (
        await service.getCategoryDirectChildren(
          { id: 'fakeId' },
          {
            id: '1',
            name: '',
            parentCategory: null,
            owner: null,
            isSystem: true,
            isOutcome: true,
          },
        )
      ).map((r: ITransactionCategory): string => r.id),
    ).toEqual(['2', '3', '4']);
  });

  it('check getOwnCategories method', async () => {
    expect(
      (await service.getOwnCategories({ id: 'fakeId' })).map(
        (r: ITransactionCategory): string => r.id,
      ),
    ).toEqual([]);
  });

  it('check search method', async () => {
    expect(
      (await service.search({ id: 'fakeId' }, 'smth')).map(
        (r: ITransactionCategory): string => r.id,
      ),
    ).toEqual([]);
  });

  it('check addCategory method: isOutcome error', async () => {
    try {
      await service.addCategory(
        { id: 'fakeId' },
        {
          name: 'fakeCategory',
          isOutcome: false,
          parentCategoryId: firstCategory.id,
        },
      );
    } catch (e) {
      expect(e.message).toBe('isOutcome field is common for all category tree');
    }
  });

  it('check addCategory method', async () => {
    expect(
      await service.addCategory(
        { id: 'fakeId' },
        {
          name: 'fakeCategory',
          isOutcome: true,
          parentCategoryId: firstCategory.id,
        },
      ),
    ).toEqual({
      id: 'fakeId',
      isOutcome: true,
      isSystem: false,
      name: 'fakeCategory',
      owner: {
        id: 'fakeId',
      },
      parentCategory: {
        id: '1',
        isOutcome: true,
        isSystem: true,
        name: '',
        owner: null,
        parentCategory: null,
      },
    });
  });

  it('check updateCategory method: isOutcome error', async () => {
    try {
      await service.updateCategory(secondCategory, {
        name: secondCategory.name,
        isOutcome: false,
        parentCategoryId: secondCategory.parentCategory.id,
      });
    } catch (e) {
      expect(e.message).toBe('isOutcome field is common for all category tree');
    }
  });

  it('check updateCategory method', async () => {
    expect(
      await service.updateCategory(secondCategory, {
        name: 'Changed name',
        isOutcome: secondCategory.isOutcome,
        parentCategoryId: secondCategory.parentCategory.id,
      }),
    ).toEqual(Object.assign({}, secondCategory, { name: 'Changed name' }));
  });

  it('check deleteCategory method: some error', async () => {
    jest
      .spyOn(fakeTransactionCategoryRepo, 'delete')
      .mockImplementationOnce(
        (deleteCriteria: Criteria<ITransactionCategory>) => {
          throw new Error('Delete error');
        },
      );
    try {
      await service.deleteCategory(seventhCategory);
    } catch (e) {
      expect(e.message).toBe('Delete error');
    }
    jest.spyOn(fakeTransactionCategoryRepo, 'delete').mockClear();
  });

  it('check deleteCategory method', async () => {
    expect(await service.deleteCategory(seventhCategory)).toEqual(
      seventhCategory,
    );
  });
});
