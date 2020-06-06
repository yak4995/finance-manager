import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../core/app/users/enums/roles.enum';

export const OnlyRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
