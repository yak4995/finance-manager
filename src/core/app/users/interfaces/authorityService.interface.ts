import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import IUser from '../../../domain/users/entities/user.interface';
import IUserCredential from '../entities/userCredential.interface';

export default interface IAuthorityService {
  signUp(payload: UserRegisterDto): Promise<IUserCredential>;
  signIn(payload: UserLoginDto): Promise<IUserCredential>;
  signOut(user: IUser): Promise<boolean>;
  deleteAccount(user: IUser): Promise<boolean>;
}
