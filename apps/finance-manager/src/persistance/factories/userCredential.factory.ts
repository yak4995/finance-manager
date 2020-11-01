import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';

import EntityCreator from '@domain/entityCreator.interface';
import IRepository from '@domain/repository.interface';

import { Injectable, Inject } from '@nestjs/common';

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

  public createUserCredentialRepo(): IRepository<ISecuredUserCredential> {
    return this.userCredentialRepository;
  }
}
