import { UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { Roles } from '@app/users/enums/roles.enum';
import IUserCredential from '@app/users/entities/userCredential.interface';
import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';

import IRepository from '@domain/repository.interface';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import {
  Role,
  UpdateUserCredentialInput,
} from '@common/graphql.schema.generated';
import GqlAuthGuard from '@common/guards/gql-auth.guard';

import { PrismaService } from '@persistance/prisma/prisma.service';

@Resolver('UserCredential')
@OnlyRoles(Roles.ADMINISTRATOR)
export default class UsersResolver {
  private readonly userCredentialRepo: IRepository<IUserCredential>;

  constructor(
    private readonly prisma: PrismaService,
    userCredentialFactory: UserCredentialAbstractFactory,
  ) {
    this.userCredentialRepo = userCredentialFactory.createUserCredentialRepo();
  }

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
    return this.prisma.roles.findMany();
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
