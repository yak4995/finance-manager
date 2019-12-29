import IUserCredential from '../entities/userCredential.interface';
import IUser from '../../../domain/users/entities/user.interface';

export default interface AuthorityOutputPort {
  processLogin(user: IUserCredential): Promise<any>;
  processRegistration(
    savedUser: IUserCredential,
    mailingResult: boolean,
  ): Promise<any>;
  processLogout(user: IUser, logoutResult: boolean): Promise<any>;
  processAccountInfoChanging(user: IUser): Promise<any>;
  processAccountProfileImageChanging(user: IUser): Promise<any>;
  processAccountDeleting(user: IUser, deletingResult: boolean): Promise<any>;
}
