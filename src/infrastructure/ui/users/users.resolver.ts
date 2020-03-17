import { Inject } from '@nestjs/common';
import {
  Query,
  Resolver,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import {
  UpdateUserCredentialInput,
  Role,
} from '../../graphql.schema.generated';
import IRepository from '../../../core/domain/repository.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';

// TODO: authorization (via admin)
@Resolver('UserCredential')
export class UsersResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('UserCredentialRepo')
    private readonly userCredentialRepo: IRepository<IUserCredential>,
  ) {}

  @Query()
  userCredentials(): Promise<IUserCredential[]> {
    return this.userCredentialRepo.findByAndCriteria({});
  }

  @Query()
  async userCredential(@Args('id') id: string): Promise<IUserCredential> {
    return this.userCredentialRepo.findById(id);
  }

  @ResolveProperty('roles')
  getRoles(@Parent() { id }): Promise<Role[]> {
    return this.userCredentialRepo.getRelatedEntities(id, 'roles');
  }

  @Query()
  async roles(): Promise<Role[]> {
    return this.prisma.client.roles();
  }

  @Mutation()
  updateUserCredential(@Args('data') data: UpdateUserCredentialInput) {
    const { id, ...preparedData } = data;
    return this.userCredentialRepo.update(preparedData, id);
  }
}
