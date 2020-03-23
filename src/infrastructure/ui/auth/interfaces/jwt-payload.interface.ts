import { Roles } from '../../../../core/app/users/enums/roles.enum';

export interface JwtPayloadInterface {
  id: string;
  email: string;
  isActive: boolean;
  roles: Roles[];
}
