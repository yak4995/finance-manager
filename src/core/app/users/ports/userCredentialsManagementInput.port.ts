import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';

export default interface UserCredentialsManagementInputPort {
  signUp(payload: UserRegisterDto): Promise<void>;
  changeAccountInfo(user: IUser, payload: UserInfoDto): Promise<void>;
  changeProfileImage(user: IUser, newProfileImagePath: string): Promise<void>;
  deleteAccount(user: IUser): Promise<void>;
}
