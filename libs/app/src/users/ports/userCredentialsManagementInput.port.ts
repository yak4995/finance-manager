import IUser from '@domain/users/entities/user.interface';

import IUserInfoDto from '../dto/iUserInfo.dto';
import IUserRegisterDto from '../dto/iUserRegister.dto';

export default interface UserCredentialsManagementInputPort {
  signUp(payload: IUserRegisterDto): Promise<any>;
  changeAccountInfo(user: IUser, payload: IUserInfoDto): Promise<any>;
  changeProfileImage(user: IUser, newProfileImagePath: string): Promise<any>;
  deleteAccount(user: IUser): Promise<any>;
}
