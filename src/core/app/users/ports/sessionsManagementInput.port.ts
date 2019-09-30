import IUser from '../../../domain/users/entities/user.interface';
import UserLoginDto from '../dto/userLogin.dto';

export default interface SessionsManagementInputPort {
  signIn(payload: UserLoginDto): Promise<void>;
  signOut(user: IUser): Promise<void>;
}
