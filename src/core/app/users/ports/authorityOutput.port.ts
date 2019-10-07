import IUserCredential from '../entities/userCredential.interface';
import IUser from '../../../domain/users/entities/user.interface';

export default interface AuthorityOutputPort {
  processLogin(user: IUserCredential): Promise<void>;
  processRegistration(
    savedUser: IUserCredential,
    mailingResult: boolean,
  ): Promise<void>;
  processLogout(user: IUser, logoutResult: boolean): Promise<void>;
  processAccountInfoChanging(user: IUser): Promise<void>;
  processAccountProfileImageChanging(user: IUser): Promise<void>;
  processAccountDeleting(user: IUser, deletingResult: boolean): Promise<void>;
}
