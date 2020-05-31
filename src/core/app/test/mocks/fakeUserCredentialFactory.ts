import UserCredentialAbstractFactory from '../../users/factories/userCredentialFactory';
import EntityCreator from '../../../domain/entityCreator.interface';
import IUserCredential from '../../users/entities/userCredential.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';
import FakeRepo from '../../../domain/test/mocks/fakeRepo';

/* istanbul ignore next */
export default class FakeUserCredentialFactory extends UserCredentialAbstractFactory {
  constructor(
    private readonly users: IUserCredential[],
    userCredentialCreator: EntityCreator<IUserCredential>,
  ) {
    super(userCredentialCreator);
  }
  createUserCredential(fields: Criteria<IUserCredential>): IUserCredential {
    return super.createUserCredential(fields);
  }
  createUserCredentialRepo(): IRepository<IUserCredential> {
    return new FakeRepo<IUserCredential>(this.users);
  }
}
