import { Roles } from '@app/users/enums/roles.enum';

import EntityCreator from '@domain/entityCreator.interface';
import { Criteria } from '@domain/repository.interface';

import { Injectable } from '@nestjs/common';

import ISecuredUserCredential from '../entities/securedUserCredential';

@Injectable()
export default class UserCredentialCreator
  implements EntityCreator<ISecuredUserCredential> {
  public getInstance(
    fields: Criteria<ISecuredUserCredential>,
  ): ISecuredUserCredential {
    return {
      id: fields.id ?? 'fakeId',
      email: fields.email ?? 'test@example.com',
      isActive: fields.isActive ?? true,
      profileImageUrl: fields.profileImageUrl ?? '',
      roles: fields.roles ?? [Roles.USER],
      // passwordHash: fields.passwordHash,
      otp: null,
      lastLoginDate: null,
    };
  }
}
