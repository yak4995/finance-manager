import AuthorityOutputPort from '../users/ports/authorityOutput.port';
import IUser from '../../domain/users/entities/user.interface';
import IUserCredential from '../users/entities/userCredential.interface';

export default class FakeAuthorityOutputPort implements AuthorityOutputPort {
  async processLogin(user: IUserCredential): Promise<void> {
    if (user === null) {
      throw new Error('Such user doesn`t exist');
    }
  }

  async processRegistration(
    savedUser: IUserCredential,
    mailingResult: boolean,
  ): Promise<void> {
    if (savedUser === null) {
      throw new Error('Such user already exists');
    }
    if (!mailingResult) {
      throw new Error('Mailing event has not been emitted correctly');
    }
  }

  async processLogout(user: IUser, logoutResult: boolean): Promise<void> {
    if (!logoutResult) {
      throw new Error('Such user has not been logged out');
    }
  }

  async processAccountInfoChanging(user: IUser): Promise<void> {
    if (user === null) {
      throw new Error('Such user doesn`t exists');
    }
  }

  async processAccountProfileImageChanging(user: IUser): Promise<void> {
    if (user === null) {
      throw new Error('Such user doesn`t exists');
    }
  }

  async processAccountDeleting(
    user: IUser,
    deletingResult: boolean,
  ): Promise<void> {
    if (!deletingResult) {
      throw new Error('Such user has not been removed');
    }
  }
}
