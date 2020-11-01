import AuthorityOutputPort from '../../users/ports/authorityOutput.port';
import IUserCredential from '../../users/entities/userCredential.interface';

import IUser from '../../../../domain/src/users/entities/user.interface';

/* istanbul ignore next */
export default class FakeAuthorityOutputPort implements AuthorityOutputPort {
  async processLogin(
    user: IUserCredential,
    e: Error = null,
  ): Promise<IUserCredential> {
    if (e) {
      throw e;
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
    return [user, logoutResult];
  }

  async processAccountInfoChanging(
    user: IUser,
    e: Error = null,
  ): Promise<IUser> {
    if (e) {
      throw e;
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
    return [user, deletingResult];
  }
}
