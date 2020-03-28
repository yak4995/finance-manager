import { Injectable, Inject } from '@nestjs/common';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import IRepository from '../../../core/domain/repository.interface';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import ISecuredUserCredential from '../entities/securedUserCredential';

@Injectable()
export default class UserCredentialFactory extends UserCredentialAbstractFactory {
  constructor(
    @Inject('UserCredentialRepositoryForFactory')
    private readonly userCredentialRepository: IRepository<
      ISecuredUserCredential
    >,
    @Inject('UserCredentialCreator')
    userCredentialCreator: EntityCreator<ISecuredUserCredential>,
  ) {
    super(userCredentialCreator);
  }

  createUserCredentialRepo(): IRepository<ISecuredUserCredential> {
    return this.userCredentialRepository;
  }
}
