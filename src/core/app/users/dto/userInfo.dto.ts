import { Roles } from '../enums/roles.enum';

export default class UserInfoDto {
  email?: string;
  roles?: Roles[];
  isActive?: boolean;
}
