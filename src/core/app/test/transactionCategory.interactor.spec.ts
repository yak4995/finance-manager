import 'ts-jest';

import IRepository, { Criteria } from '../../domain/repository.interface';
import ITransactionCategory from '../../domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../domain/transactionCategories/factories/transactionCategoryFactory';
import TransactionCategoryInteractor from '../transactionCategories/interactors/transactionCategory.interactor';

import FakeSearchService from './mocks/FakeSearchService';
import FakeTransactionCategoryOutputPort from './mocks/fakeTransactionCategoryOutputPort';
import FakeTransactionCategoryFactory from './mocks/fakeTransactionCategoryFactory';

import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
  transactionCategoriesForSearch,
} from '../../domain/test/fixtures/transactionCategories';

describe('TransactionCategoryInteractor tests', () => {
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
  const fakeTransactionCategoryFactory: TransactionCategoryAbstractFactory = FakeTransactionCategoryFactory.getInstance();
  const fakeTransactionCategoryRepo: IRepository<ITransactionCategory> = fakeTransactionCategoryFactory.createTransactionCategoryRepo();
  const service: TransactionCategoryInteractor = new TransactionCategoryInteractor(
    fakeTransactionCategoryFactory,
    new FakeSearchService<ITransactionCategory>(transactionCategoriesForSearch),
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
    ).toEqual(['abc']);
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
      .mockReturnValueOnce(Promise.reject(new Error('Delete error')));
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
