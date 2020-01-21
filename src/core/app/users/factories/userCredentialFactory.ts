import EntityCreator from '../../../domain/entityCreator.interface';
import IUserCredential from '../entities/userCredential.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
export default abstract class UserCredentialAbstractFactory {
  protected constructor(
    private userCredentialCreator: EntityCreator<IUserCredential>,
  ) {}

  public static setInstance(instance: UserCredentialAbstractFactory) {
    this.instance = instance;
  }

  protected static instance: UserCredentialAbstractFactory = null;

  public static getInstance(): UserCredentialAbstractFactory {
    if (this.instance !== null) {
      return this.instance;
    }
    return null;
  }

  public createUserCredential(
    fields: Criteria<IUserCredential>,
  ): IUserCredential {
    return this.userCredentialCreator.getInstance(fields);
  }

  public abstract createUserCredentialRepo(): IRepository<IUserCredential>;
}
