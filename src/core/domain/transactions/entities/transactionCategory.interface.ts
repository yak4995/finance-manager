import IUser from '../../users/entities/user.interface';
import IPersistantEntity from '../../persistantEntity';

export default interface ITransactionCategory extends IPersistantEntity {
  name: string;
  parentCategory: ITransactionCategory | null;
  owner: IUser | null;
  isSystem: boolean;
  isOutcome: boolean;
}
