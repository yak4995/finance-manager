import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';

export default interface UserCredentialsManagementInputPort {
  signUp(payload: UserRegisterDto): Promise<any>;
  changeAccountInfo(user: IUser, payload: UserInfoDto): Promise<any>;
  changeProfileImage(user: IUser, newProfileImagePath: string): Promise<any>;
  deleteAccount(user: IUser): Promise<any>;
}
