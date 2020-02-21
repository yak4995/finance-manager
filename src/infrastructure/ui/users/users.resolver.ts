import {
  Query,
  Resolver,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import { UpdateUserCredentialInput } from 'infrastructure/persistance/graphql.schema.generated';

// TODO: authorization (via admin)
// TODO: repo, factory and interactor
// TODO: other entities for admin, excluding transactions and distributing metrics
@Resolver('UserCredential')
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  userCredentials() {
    return this.prisma.client.userCredentials();
  }

  @Query()
  userCredential(@Args('id') id: string) {
    return this.prisma.client.userCredential({ id });
  }

  @ResolveProperty('roles')
  getRoles(@Parent() { id }) {
    return this.prisma.client.userCredential({ id }).roles();
  }

  @Mutation()
  updateUserCredential(@Args('data') data: UpdateUserCredentialInput) {
    const { id, ...preparedData } = data;
    return this.prisma.client.updateUserCredential({
      where: { id },
      data: preparedData,
    });
  }
}
