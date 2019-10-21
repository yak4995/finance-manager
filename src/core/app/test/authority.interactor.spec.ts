import 'ts-jest';
import AuthorityInteractor from '../users/interactors/authority.interactor';

describe('TransactionCategoryInteractor tests', () => {
  it('check methods existance', () => {
    const service = new AuthorityInteractor(null, null, null, null, null);
    expect(service.signUp).toBeDefined();
    expect(service.signIn).toBeDefined();
    expect(service.signOut).toBeDefined();
    expect(service.changeAccountInfo).toBeDefined();
    expect(service.changeProfileImage).toBeDefined();
    expect(service.deleteAccount).toBeDefined();
  });
});
