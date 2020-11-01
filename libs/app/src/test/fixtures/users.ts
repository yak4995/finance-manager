import IUserCredential from '../../users/entities/userCredential.interface';
import { Roles } from '../../users/enums/roles.enum';

/* istanbul ignore next */
export const usersRepoSet: IUserCredential[] = [
  {
    id: '1',
    email: 'existed@example.com',
    isActive: true,
    profileImageUrl: null,
    roles: [Roles.USER],
  },
  {
    id: '2',
    email: 'incorrectUser@example.com',
    isActive: true,
    profileImageUrl: null,
    roles: [Roles.USER],
  },
];
