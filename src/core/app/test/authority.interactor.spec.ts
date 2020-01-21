import 'ts-jest';

import IRepository, { Criteria } from '../../domain/repository.interface';
import IUser from '../../domain/users/entities/user.interface';
import IUserCredential from '../users/entities/userCredential.interface';
import { Roles } from '../users/enums/roles.enum';
import UserCredentialAbstractFactory from '../users/factories/userCredentialFactory';
import UserHasBeenCreatedEvent from '../users/events/userHasBeenCreated.event';
import { EventStatus } from '../events/eventStatus.enum';
import IEventDispatchService from '../events/eventDispatchService.interface';
import IAuthorityService from '../users/interfaces/authorityService.interface';
import AuthorityInteractor from '../users/interactors/authority.interactor';
import AuthorityOutputPort from '../users/ports/authorityOutput.port';

import FakeAuthorityService from './mocks/fakeAuthorityService';
import FakeUserCredentialFactory from './mocks/fakeUserCredentialFactory';
import FakeRegisteredUserEventDispatchService from './mocks/fakeRegisteredUserEventDispatchService';
import FakeAuthorityOutputPort from './mocks/fakeAuthorityOutputPort';

import { usersRepoSet } from './fixtures/users';

describe('AuthorityInteractor tests', () => {
  UserCredentialAbstractFactory.setInstance(
    new FakeUserCredentialFactory(usersRepoSet, {
      getInstance: (fields: Criteria<IUserCredential>) => ({
        id: 'fakeId',
        email: fields.email ? fields.email : 'test@example.com',
        isActive: fields.isActive ? fields.isActive : true,
        profileImageUrl: fields.profileImageUrl ? fields.profileImageUrl : '',
        roles: fields.roles ? fields.roles : [Roles.USER],
      }),
    }),
  );
  const fakeUserCredentialFactory: UserCredentialAbstractFactory = FakeUserCredentialFactory.getInstance();
  const userCredentialRepo: IRepository<IUserCredential> = fakeUserCredentialFactory.createUserCredentialRepo();
  const fakeAuthorityService: IAuthorityService = new FakeAuthorityService();
  const fakeRegisteredUserEventDispatchService: IEventDispatchService<UserHasBeenCreatedEvent> = new FakeRegisteredUserEventDispatchService();
  const fakeAuthorityOutputPort: AuthorityOutputPort = new FakeAuthorityOutputPort();
  const service: AuthorityInteractor = new AuthorityInteractor(
    fakeAuthorityService,
    fakeUserCredentialFactory,
    userCredentialRepo,
    fakeRegisteredUserEventDispatchService,
    fakeAuthorityOutputPort,
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
      expect(e.message).toBe('Such user already exists');
    }
  });

  it('test signUp method: exception with mailing event generation', async () => {
    try {
      await service.signUp({ email: 'badEmail@example.com' });
    } catch (e) {
      expect(e.message).toBe('Mailing event has not been emitted correctly');
    }
  });

  it('test signUp method: exception if user can`t be registered', async () => {
    try {
      await service.signUp({ email: 'registrationDenied@example.com' });
    } catch (e) {
      expect(e.message).toBe('Registration process has been interrupted!');
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
      expect(e.message).toBe('DB is not available!');
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
      expect(e.message).toBe('This user has not been found in auth service!');
    }
  });

  it('test signIn method: exception if user has not been found', async () => {
    try {
      await service.signIn({ email: 'non-existed@example.com' });
    } catch (e) {
      expect(e.message).toBe('Such entity has not been found!');
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
      expect(e.message).toBe('Such user has not been logged out');
    }
  });

  it('test signOut method: exception if user can`t be logged out', async () => {
    try {
      await service.signOut({ id: 'exceptionId' });
    } catch (e) {
      expect(e.message).toBe('Logout is not available!');
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
      expect(e.message).toBe(
        'Entity with this id has not been found in the repo!',
      );
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
      expect(e.message).toBe(
        'Entity with this id has not been found in the repo!',
      );
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
      expect(e.message).toBe('Such user has not been removed');
    }
  });

  it('test deleteAccount method: exception if user can`t be deleted', async () => {
    try {
      await service.deleteAccount({ id: 'exceptionId' });
    } catch (e) {
      expect(e.message).toBe('Deleting is not available!');
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
