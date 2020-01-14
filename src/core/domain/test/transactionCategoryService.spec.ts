import 'ts-jest';
import TransactionCategoryService from '../transactions/services/transactionCategoryService';
import IRepository from '../repository.interface';
import ITransactionCategory from '../transactions/entities/transactionCategory.interface';
import {
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  fifthCategory,
  sixthCategory,
  seventhCategory,
} from '../../app/test/fakeCategoryRepo';
import FakeRepo from './fakeRepo';

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
  const service = new TransactionCategoryService(tcRepo);

  it('check methods existance', () => {
    const service = new TransactionCategoryService(tcRepo);
    expect(service.getTransactionCategoryChildren).toBeDefined();
    expect(service.getTransactionCategoryDirectChildren).toBeDefined();
    expect(service.getTransactionCategorySiblings).toBeDefined();
  });

  it('check getTransactionCategoryChildren method', async () => {
    try {
      let result: string[] = (
        await service.getTransactionCategoryChildren(firstCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
      result = (
        await service.getTransactionCategoryChildren(thirdCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['3', '6', '7']);
    } catch (e) {
      console.log(e);
    }
  });

  it('check getTransactionCategoryDirectChildren method', async () => {
    try {
      let result: string[] = (
        await service.getTransactionCategoryDirectChildren(firstCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['2', '3', '4']);
    } catch (e) {
      console.log(e);
    }
  });

  it('check getTransactionCategorySiblings method', async () => {
    try {
      let result: string[] = (
        await service.getTransactionCategorySiblings(firstCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['1']);
      result = (
        await service.getTransactionCategorySiblings(thirdCategory)
      ).map((r: ITransactionCategory): string => r.id);
      expect(result).toEqual(['2', '3', '4']);
    } catch (e) {
      console.log(e);
    }
  });
});
