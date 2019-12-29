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

describe('TransactionCategoryInteractor tests', () => {
  const service: TransactionCategoryInteractor = new TransactionCategoryInteractor(
    FakeEntityFactory.getInstance(),
    new FakeRepo<ITransactionCategory>([
      firstCategory,
      secondCategory,
      thirdCategory,
      fourthCategory,
      fifthCategory,
      sixthCategory,
      seventhCategory,
    ]),
    new FakeSearchService(),
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
      (await service.getCategoryDirectChildren(
        { id: 'fakeId' },
        {
          id: '1',
          name: '',
          parentCategory: null,
          owner: null,
          isSystem: true,
          isOutcome: true,
        },
      )).map((r: ITransactionCategory): string => r.id),
    ).toEqual(['2', '3', '4']);
  });

  it('check getOwnCategories method', async () => {});
  it('check search method', async () => {});
  it('check addCategory method: isOutcome error', async () => {});
  it('check addCategory method', async () => {});
  it('check updateCategory method: isOutcome error', async () => {});
  it('check updateCategory method', async () => {});
  it('check deleteCategory method', async () => {});
});
