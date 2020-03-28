import { Roles } from '../../../../core/app/users/enums/roles.enum';

export default interface JwtPayloadInterface {
  id: string;
  email: string;
  isActive: boolean;
  roles: Roles[];
}
