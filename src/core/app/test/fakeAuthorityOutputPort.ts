import AuthorityOutputPort from '../users/ports/authorityOutput.port';
import IUser from '../../domain/users/entities/user.interface';
import IUserCredential from '../users/entities/userCredential.interface';

export default class FakeAuthorityOutputPort implements AuthorityOutputPort {
  async processLogin(
    user: IUserCredential,
    e: Error = null,
  ): Promise<IUserCredential> {
    if (e) {
      throw e;
    }
    if (user === null) {
      throw new Error('Such user doesn`t exist');
    }
    return user;
  }

  async processRegistration(
    savedUser: IUserCredential,
    mailingResult: boolean,
    e: Error = null,
  ): Promise<[IUserCredential, boolean]> {
    if (e) {
      throw e;
    }
    if (savedUser === null) {
      throw new Error('Such user already exists');
    }
    if (!mailingResult) {
      throw new Error('Mailing event has not been emitted correctly');
    }
    return [savedUser, mailingResult];
  }

  async processLogout(
    user: IUser,
    logoutResult: boolean,
    e: Error = null,
  ): Promise<[IUser, boolean]> {
    if (e) {
      throw e;
    }
    if (!logoutResult) {
      throw new Error('Such user has not been logged out');
    }
    return [user, logoutResult];
  }

  async processAccountInfoChanging(
    user: IUser,
    e: Error = null,
  ): Promise<IUser> {
    if (e) {
      throw e;
    }
    if (user === null) {
      throw new Error('Such user doesn`t exists');
    }
    return user;
  }

  async processAccountProfileImageChanging(
    user: IUser,
    e: Error = null,
  ): Promise<IUser> {
    if (e) {
      throw e;
    }
    if (user === null) {
      throw new Error('Such user doesn`t exists');
    }
    return user;
  }

  async processAccountDeleting(
    user: IUser,
    deletingResult: boolean,
    e: Error = null,
  ): Promise<[IUser, boolean]> {
    if (e) {
      throw e;
    }
    if (!deletingResult) {
      throw new Error('Such user has not been removed');
    }
    return [user, deletingResult];
  }
}
