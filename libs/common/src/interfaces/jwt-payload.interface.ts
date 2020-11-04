import { Roles } from '@app/users/enums/roles.enum';

export default interface JwtPayloadInterface {
  id: string;
  email: string;
  isActive: boolean;
  roles: Roles[];
}
