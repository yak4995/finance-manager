import { IUser } from '../../../core/users/domain/user.interface';

export interface ITransactionCategory {
  getName(): string;
  getParentCategory(): ITransactionCategory;
  getOwner(): IUser | null;
  isSystem(): boolean;
  isOutcome(): boolean;
  setName(name: string): this;
  setParentCategory(parent: ITransactionCategory): this;
  setOwner(owner: IUser | null): this;
  setSystem(isSystem: boolean): this;
  setOutcome(isOutcome: boolean): this;
}
