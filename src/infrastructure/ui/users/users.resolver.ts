import { Inject, UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import PrismaService from '../../persistance/prisma/prisma.service';
import {
  UpdateUserCredentialInput,
  Role,
} from '../../graphql.schema.generated';
import IRepository from '../../../core/domain/repository.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import { OnlyRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../../../core/app/users/enums/roles.enum';

@Resolver('UserCredential')
@OnlyRoles(Roles.ADMINISTRATOR)
export default class UsersResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('UserCredentialRepo')
    private readonly userCredentialRepo: IRepository<IUserCredential>,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  userCredentials(): Promise<IUserCredential[]> {
    return this.userCredentialRepo.findByAndCriteria({});
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async userCredential(@Args('id') id: string): Promise<IUserCredential> {
    return this.userCredentialRepo.findById(id);
  }

  @ResolveProperty('roles')
  getRoles(@Parent() { id }): Promise<Role[]> {
    return this.userCredentialRepo.getRelatedEntities(id, 'roles');
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async roles(): Promise<Role[]> {
    return this.prisma.client.roles();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  updateUserCredential(
    @Args('data') data: UpdateUserCredentialInput,
  ): Promise<IUserCredential> {
    const { id, ...preparedData } = data;
    return this.userCredentialRepo.update(preparedData, id);
  }
}
