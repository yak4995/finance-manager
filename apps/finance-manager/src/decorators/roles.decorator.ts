import { Roles } from '@app/users/enums/roles.enum';

import { SetMetadata } from '@nestjs/common';

export const OnlyRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
