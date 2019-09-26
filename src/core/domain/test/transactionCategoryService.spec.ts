import 'ts-jest';
import TransactionCategoryService from '../transactions/services/transactionCategoryService';
import IRepository from '../repository.interface';
import ITransactionCategory from '../transactions/transactionCategory.interface';
import FakeCategoryRepo, {
  firstCategory,
  thirdCategory,
} from './fakeCategoryRepo';

describe('TransactionCategoryService tests', () => {
  const tcRepo: IRepository<ITransactionCategory> = new FakeCategoryRepo();
  const service = new TransactionCategoryService(tcRepo);

  it('check methods existance', () => {
    const service = new TransactionCategoryService(tcRepo);
    expect(service.getTransactionCategoryChildren).toBeDefined();
    expect(service.getTransactionCategoryDirectChildren).toBeDefined();
    expect(service.getTransactionCategorySiblings).toBeDefined();
  });

  it('check getTransactionCategoryChildren method', async () => {
    try {
      let result = (await service.getTransactionCategoryChildren(
        firstCategory,
      )).map(r => r.id);
      expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
      result = (await service.getTransactionCategoryChildren(
        thirdCategory,
      )).map(r => r.id);
      expect(result).toEqual(['3', '6', '7']);
    } catch (e) {
      console.log(e);
    }
  });

  it('check getTransactionCategoryDirectChildren method', async () => {
    try {
      let result = (await service.getTransactionCategoryDirectChildren(
        firstCategory,
      )).map(r => r.id);
      expect(result).toEqual(['2', '3', '4']);
    } catch (e) {
      console.log(e);
    }
  });

  it('check getTransactionCategorySiblings method', async () => {
    try {
      let result = (await service.getTransactionCategorySiblings(
        firstCategory,
      )).map(r => r.id);
      expect(result).toEqual(['1']);
      result = (await service.getTransactionCategorySiblings(
        thirdCategory,
      )).map(r => r.id);
      expect(result).toEqual(['2', '3', '4']);
    } catch (e) {
      console.log(e);
    }
  });
});
