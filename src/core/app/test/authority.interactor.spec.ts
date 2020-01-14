import 'ts-jest';
import AuthorityInteractor from '../users/interactors/authority.interactor';
import FakeAuthorityService from './fakeAuthorityService';
import FakeEntityFactory from './fakeEntityFactory';
import FakeRegisteredUserEventDispatchService from './fakeRegisteredUserEventDispatchService';
import FakeAuthorityOutputPort from './fakeAuthorityOutputPort';
import FakeRepo from '../../domain/test/fakeRepo';
import { Roles } from '../users/enums/roles.enum';
import IUserCredential from '../users/entities/userCredential.interface';
import IRepository from '../../domain/repository.interface';
import IUser from '../../domain/users/entities/user.interface';
import UserHasBeenCreatedEvent from '../users/events/userHasBeenCreated.event';
import { EventStatus } from '../events/eventStatus.enum';

describe('Authority tests', () => {
  const userCredentialRepo: IRepository<IUserCredential> = new FakeRepo<
    IUserCredential
  >([
    {
      id: '1',
      email: 'existed@example.com',
      isActive: true,
      profileImageUrl: null,
      roles: [Roles.USER],
    },
    {
      id: '2',
      email: 'incorrectUser@example.com',
      isActive: true,
      profileImageUrl: null,
      roles: [Roles.USER],
    },
  ]);
  const service = new AuthorityInteractor(
    new FakeAuthorityService(),
    FakeEntityFactory.getInstance(),
    userCredentialRepo,
    new FakeRegisteredUserEventDispatchService(),
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

  it('check UserHasBeenCreatedEvent state', () => {
    expect(new UserHasBeenCreatedEvent(null).state).toBe(EventStatus.WAITING);
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
    jest.spyOn(userCredentialRepo, 'insert').mockImplementationOnce(
      async (entity: IUserCredential): Promise<IUserCredential> => {
        if (entity.email === 'dbDenied@example.com') {
          throw new Error('DB is not available!');
        }
        return entity;
      },
    );
    try {
      await service.signUp({ email: 'dbDenied@example.com' });
    } catch (e) {
      expect(e).toEqual(new Error('DB is not available!'));
    }
    jest.spyOn(userCredentialRepo, 'insert').mockClear();
  });

  it('test signUp method', async () => {
    const result: [IUserCredential, boolean] = await service.signUp({
      email: 'test@example.com',
    });
    expect(result[0].email).toBe('test@example.com');
    expect(result[1]).toBe(true);
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
    const result: IUserCredential = await service.signIn({
      email: 'existed@example.com',
    });
    expect(result.email).toBe('existed@example.com');
  });

  it('test signOut method: exception if user can`t be logged out', async () => {
    try {
      await service.signOut({ id: 'incorrectId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been logged out'));
    }
  });

  it('test signOut method: exception if user can`t be logged out', async () => {
    try {
      await service.signOut({ id: 'exceptionId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been logged out'));
    }
  });

  it('test signOut method', async () => {
    const result: [IUser, boolean] = await service.signOut({ id: 'fakeId' });
    expect(result[0].id).toBe('fakeId');
    expect(result[1]).toBe(true);
  });

  it('test changeAccountInfo method: exception if user account info can`t be updated', async () => {
    try {
      await service.changeAccountInfo({ id: 'incorrectId' }, {});
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exists'));
    }
  });

  it('test changeAccountInfo method', async () => {
    const result: IUser = await service.changeAccountInfo({ id: 'fakeId' }, {});
    expect(result.id).toBe('fakeId');
  });

  it('test changeProfileImage method: exception if user profile image can`t be updated', async () => {
    try {
      await service.changeProfileImage({ id: 'incorrectId' }, '');
    } catch (e) {
      expect(e).toEqual(new Error('Such user doesn`t exists'));
    }
  });

  it('test changeProfileImage method', async () => {
    const result: IUser = await service.changeProfileImage(
      { id: 'fakeId' },
      '',
    );
    expect(result.id).toBe('fakeId');
  });

  it('test deleteAccount method: exception if user can`t be deleted', async () => {
    try {
      await service.deleteAccount({ id: 'incorrectId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been removed'));
    }
  });

  it('test deleteAccount method: exception if user can`t be deleted', async () => {
    try {
      await service.deleteAccount({ id: 'exceptionId' });
    } catch (e) {
      expect(e).toEqual(new Error('Such user has not been removed'));
    }
  });

  it('test deleteAccount method', async () => {
    const result: [IUser, boolean] = await service.deleteAccount({
      id: 'fakeId',
    });
    expect(result[0].id).toBe('fakeId');
    expect(result[1]).toBe(true);
  });
});
