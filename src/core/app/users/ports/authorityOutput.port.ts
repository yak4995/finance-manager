import IUserCredential from '../entities/userCredential.interface';
import IUser from '../../../domain/users/entities/user.interface';

export default interface AuthorityOutputPort {
  processLogin(user: IUserCredential): void;
  processRegistration(savedUser: IUserCredential, mailingResult: boolean): void;
  processLogout(user: IUser, logoutResult: boolean): void;
  processAccountInfoChanging(user: IUser): void;
  processAccountProfileImageChanging(user: IUser): void;
  processAccountDeleting(user: IUser, deletingResult: boolean): void;
}
