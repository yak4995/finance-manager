import IUser from '@domain/users/entities/user.interface';

import { Roles } from '../enums/roles.enum';

// Probably children: TypeOrmUserCredentialEntity, MongooseUserCredentialSchema, XMLUserCredentialEntity
export default interface IUserCredential extends IUser {
  email: string;
  profileImageUrl: string | null;
  roles: Roles[];
  isActive: boolean;
}
