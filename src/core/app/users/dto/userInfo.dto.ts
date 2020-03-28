import { Roles } from '../enums/roles.enum';

export default interface UserInfoDto {
  email?: string;
  roles?: Roles[];
  isActive?: boolean;
}
