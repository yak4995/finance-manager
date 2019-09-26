import { Criteria } from '../repository.interface';
import IUser from './user.interface';

export default interface IUserCreator {
  getInstance(fields: Criteria<IUser>): IUser;
}
