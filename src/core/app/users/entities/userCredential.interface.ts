import IUser from '../../../domain/users/entities/user.interface';
import { Roles } from '../enums/roles.enum';

export default interface IUserCredential extends IUser {
  email: string;
  profileImageUrl: string | null;
  roles: Roles[];
  isActive: boolean;
  password: string;
}
