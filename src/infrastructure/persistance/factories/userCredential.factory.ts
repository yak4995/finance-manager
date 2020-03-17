import { Injectable, Inject } from '@nestjs/common';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import IRepository from '../../../core/domain/repository.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import EntityCreator from '../../../core/domain/entityCreator.interface';

@Injectable()
export class UserCredentialFactory extends UserCredentialAbstractFactory {
  public constructor(
    @Inject('UserCredentialRepositoryForFactory')
    private readonly userCredentialRepository: IRepository<IUserCredential>,
    @Inject('UserCredentialCreator')
    userCredentialCreator: EntityCreator<IUserCredential>,
  ) {
    super(userCredentialCreator);
  }

  public createUserCredentialRepo(): IRepository<IUserCredential> {
    return this.userCredentialRepository;
  }
}
