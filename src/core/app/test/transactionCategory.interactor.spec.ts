import 'ts-jest';
import TransactionCategoryInteractor from '../transactions/interactors/transactionCategory.interactor';

describe('TransactionCategoryInteractor tests', () => {
  it('check methods existance', () => {
    const service = new TransactionCategoryInteractor(null, null, null, null);
    expect(service.getTopCategories).toBeDefined();
    expect(service.getCategoryDirectChildren).toBeDefined();
    expect(service.getOwnCategories).toBeDefined();
    expect(service.search).toBeDefined();
    expect(service.addCategory).toBeDefined();
    expect(service.updateCategory).toBeDefined();
    expect(service.deleteCategory).toBeDefined();
  });
});
