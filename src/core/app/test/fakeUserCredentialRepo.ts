import IRepository, {
  OrderCriteria,
  Criteria,
} from '../../domain/repository.interface';
import IUserCredential from '../users/entities/userCredential.interface';
import { Roles } from '../users/enums/roles.enum';

export default class FakeUserCredentialRepo
  implements IRepository<IUserCredential> {
  private repoArr: IUserCredential[] = [
    {
      id: '1',
      email: 'existed@example.com',
      isActive: true,
      profileImageUrl: null,
      roles: [Roles.USER],
    },
    {
      id: '2',
      email: 'incorrectUser@example.com',
      isActive: true,
      profileImageUrl: null,
      roles: [Roles.USER],
    },
  ];

  async insert(entity: IUserCredential): Promise<IUserCredential> {
    if (entity.email === 'dbDenied@example.com') {
      throw new Error('DB is not available!');
    }
    return entity;
  }
  async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<IUserCredential>,
    searchCriteria: Criteria<IUserCredential>,
  ) {
    return [];
  }
  async findById(id: string) {
    return null;
  }
  async findOneByAndCriteria(
    searchCriteria: Criteria<IUserCredential>,
  ): Promise<IUserCredential> {
    const result = this.repoArr.filter(
      user => user.email === searchCriteria.email,
    );
    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error('Such entity has not been found!');
    }
  }
  async findByAndCriteria(searchCriteria: Criteria<IUserCredential>) {
    return [];
  }
  async findByOrCriteria(searchCriteria: Criteria<IUserCredential>) {
    return [];
  }
  async update(updateData: Criteria<IUserCredential>, id: string) {
    if (id === 'incorrectId') {
      throw new Error('Such user doesn`t exists');
    }
    return null;
  }
  async delete(deleteCriteria: Criteria<IUserCredential>) {
    return null;
  }
}
