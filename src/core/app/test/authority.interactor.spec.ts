import 'ts-jest';
import AuthorityInteractor from '../users/interactors/authority.interactor';
import FakeAuthorityService from './fakeAuthorityService';
import FakeEntityFactory from './fakeEntityFactory';
import FakeUserCredentialRepo from './fakeUserCredentialRepo';
import FakeEventDispatchService from './fakeEventDispatchService';
import FakeAuthorityOutputPort from './fakeAuthorityOutputPort';

describe('Authority tests', () => {
  const service = new AuthorityInteractor(
    new FakeAuthorityService(),
    FakeEntityFactory.getInstance(),
    new FakeUserCredentialRepo(),
    new FakeEventDispatchService(),
    new FakeAuthorityOutputPort(),
  );

  it('check methods existance', () => {
    expect(service.signUp).toBeDefined();
    expect(service.signIn).toBeDefined();
    expect(service.signOut).toBeDefined();
    expect(service.changeAccountInfo).toBeDefined();
    expect(service.changeProfileImage).toBeDefined();
    expect(service.deleteAccount).toBeDefined();
  });

  it('test signUp method: exception if user exists', async () => {
    try {
      await service.signUp({ email: 'existed@example.com' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user already exists'));
    }
  });

  it('test signUp method: exception with mailing event generation', async () => {
    try {
      await service.signUp({ email: 'badEmail@example.com' });
    } catch (e) {
      expect(e).toEqual(
        new Error('Mailing event has not been emitted correctly'),
      );
    }
  });

  it('test signUp method: exception if user can`t be registered', async () => {
    try {
      await service.signUp({ email: 'registrationDenied@example.com' });
    } catch (e) {
      expect(e).toEqual(
        new Error('Registration process has been interrupted!'),
      );
    }
  });

  it('test signUp method: exception if user can`t be saved', async () => {
    try {
      await service.signUp({ email: 'dbDenied@example.com' });
    } catch (e) {
      expect(e).toEqual(new Error('DB is not available!'));
    }
  });

  it('test signUp method', async () => {
    expect(
      await service.signUp({ email: 'test@example.com' }),
    ).not.toBeInstanceOf(Error);
  });

  it('test signIn method: exception if user doesn`t exist', async () => {
    try {
      await service.signIn({ email: 'incorrectUser@example.com' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exist'));
    }
  });

  it('test signIn method: exception if user has not been found', async () => {
    try {
      await service.signIn({ email: 'non-existed@example.com' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exist'));
    }
  });

  it('test signIn method', async () => {
    expect(
      await service.signIn({ email: 'existed@example.com' }),
    ).not.toBeInstanceOf(Error);
  });

  it('test signOut method: exception if user can`t be logged out', async () => {
    try {
      await service.signOut({ id: 'incorrectId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been logged out'));
    }
  });

  it('test signOut method', async () => {
    expect(await service.signOut({ id: 'fakeId' })).not.toBeInstanceOf(Error);
  });

  it('test changeAccountInfo method: exception if user account info can`t be updated', async () => {
    try {
      await service.changeAccountInfo({ id: 'incorrectId' }, {});
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exists'));
    }
  });

  it('test changeAccountInfo method', async () => {
    expect(
      await service.changeAccountInfo({ id: 'fakeId' }, {}),
    ).not.toBeInstanceOf(Error);
  });

  it('test changeProfileImage method: exception if user profile image can`t be updated', async () => {
    try {
      await service.changeProfileImage({ id: 'incorrectId' }, '');
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exists'));
    }
  });

  it('test changeProfileImage method', async () => {
    expect(
      await service.changeProfileImage({ id: 'fakeId' }, ''),
    ).not.toBeInstanceOf(Error);
  });

  it('test deleteAccount method: exception if user can`t be deleted', async () => {
    try {
      await service.deleteAccount({ id: 'incorrectId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been removed'));
    }
  });

  it('test deleteAccount method', async () => {
    expect(await service.deleteAccount({ id: 'fakeId' })).not.toBeInstanceOf(
      Error,
    );
  });
});
