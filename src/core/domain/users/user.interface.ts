import { Roles } from './enums/roles.enum';
import IPersistantEntity from '../persistantEntity';

export default interface IUser extends IPersistantEntity {
  email: string;
  profileImageUrl: string | null;
  roles: Roles[];
  isActive: boolean;
}
