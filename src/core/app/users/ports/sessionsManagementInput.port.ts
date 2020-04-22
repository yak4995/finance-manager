import IUser from '../../../domain/users/entities/user.interface';
import IUserLoginDto from '../dto/iUserLogin.dto';

export default interface SessionsManagementInputPort {
  signIn(payload: IUserLoginDto): Promise<any>;
  signOut(user: IUser): Promise<any>;
}
