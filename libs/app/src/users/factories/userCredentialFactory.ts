import EntityCreator from '@domain/entityCreator.interface';
import IRepository, { Criteria } from '@domain/repository.interface';

import IUserCredential from '../entities/userCredential.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
// Also we choose between Singleton and type-parameterized factory, because static fields doesn`t support type parameters
export default abstract class UserCredentialAbstractFactory {
  protected constructor(
    private readonly userCredentialCreator: EntityCreator<IUserCredential>,
  ) {}

  public static setInstance(instance: UserCredentialAbstractFactory) {
    this.instance = instance;
  }

  protected static instance: UserCredentialAbstractFactory = null;

  public static getInstance(): UserCredentialAbstractFactory {
    return this.instance;
  }

  public createUserCredential(
    fields: Criteria<IUserCredential>,
  ): IUserCredential {
    return this.userCredentialCreator.getInstance(fields);
  }

  public abstract createUserCredentialRepo(): IRepository<IUserCredential>;
}
