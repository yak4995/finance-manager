import IUserCredential from '../entities/userCredential.interface';
import IUser from '../../../domain/users/entities/user.interface';

export default interface AuthorityOutputPort {
  processLogin(user: IUserCredential, e: Error): Promise<any>;
  processRegistration(
    savedUser: IUserCredential,
    mailingResult: boolean,
    e: Error,
  ): Promise<any>;
  processLogout(user: IUser, logoutResult: boolean, e: Error): Promise<any>;
  processAccountInfoChanging(user: IUser, e: Error): Promise<any>;
  processAccountProfileImageChanging(user: IUser, e: Error): Promise<any>;
  processAccountDeleting(
    user: IUser,
    deletingResult: boolean,
    e: Error,
  ): Promise<any>;
}
