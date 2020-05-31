import { Injectable } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import { Criteria } from '../../../core/domain/repository.interface';
import { Roles } from '../../../core/app/users/enums/roles.enum';
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
      passwordHash: fields.passwordHash,
    };
  }
}
