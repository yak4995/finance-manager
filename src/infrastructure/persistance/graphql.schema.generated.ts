/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class UpdateUserCredentialInput {
  id: string;
  email?: string;
  profileImageUrl?: string;
  isActive?: boolean;
}

export class AnalyticMetric {
  id: string;
  name: string;
}

export class Currency {
  id: string;
  name: string;
  code: string;
}

export abstract class IMutation {
  abstract updateUserCredential(
    data?: UpdateUserCredentialInput,
  ): UserCredential | Promise<UserCredential>;
}

export class Period {
  id: string;
  name: string;
}

export abstract class IQuery {
  abstract userCredentials(): UserCredential[] | Promise<UserCredential[]>;

  abstract userCredential(id: string): UserCredential | Promise<UserCredential>;
}

export class Role {
  id: string;
  name: string;
}

export class TransactionCategory {
  id: string;
  name: string;
  parentCategory?: TransactionCategory;
  isSystem: boolean;
  isOutcome: boolean;
  childCategories: TransactionCategory[];
}

export class UserCredential {
  id: string;
  email: string;
  profileImageUrl?: string;
  roles: Role[];
  isActive: boolean;
}
