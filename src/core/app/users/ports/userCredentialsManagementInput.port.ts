import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UpdateUserPasswordDto from '../dto/updateUserPassword.dto';
import UserRegisterDto from '../dto/userRegister.dto';

export default interface UserCredentialsManagementInputPort {
  signUp(payload: UserRegisterDto): Promise<void>;
  changeAccountInfo(user: IUser, payload: UserInfoDto): Promise<void>;
  changeProfileImage(user: IUser, newProfileImagepath: string): Promise<void>;
  changePassword(user: IUser, payload: UpdateUserPasswordDto): Promise<void>;
  deleteAccount(user: IUser): Promise<void>;
}
