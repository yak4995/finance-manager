import EntityCreator from '../../../core/domain/entityCreator.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import { Criteria } from '../../../core/domain/repository.interface';
import { Roles } from '../../../core/app/users/enums/roles.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCredentialCreator implements EntityCreator<IUserCredential> {
  getInstance(fields: Criteria<IUserCredential>): IUserCredential {
    return {
      id: fields.id ?? 'fakeId',
      email: fields.email ?? 'test@example.com',
      isActive: fields.isActive ?? true,
      profileImageUrl: fields.profileImageUrl ?? '',
      roles: fields.roles ?? [Roles.USER],
    };
  }
}
