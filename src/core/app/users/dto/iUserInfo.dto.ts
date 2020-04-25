import { Roles } from '../enums/roles.enum';

export default interface IUserInfoDto {
  email?: string;
  roles?: Roles[];
  isActive?: boolean;
}
