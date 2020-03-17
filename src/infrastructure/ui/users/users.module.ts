import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../persistance/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UserCredentialFactory } from '../../persistance/factories/userCredential.factory';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import { UserCredentialCreator } from '../../persistance/creators/userCredential.creator';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import { UserCredentialRepository } from '../../persistance/repositories/userCredential.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersService,
    UsersResolver,
    {
      provide: 'UserCredentialCreator',
      useClass: UserCredentialCreator,
    },
    {
      provide: 'UserCredentialRepositoryForFactory',
      useFactory: (prisma: PrismaService) =>
        new UserCredentialRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: UserCredentialAbstractFactory,
      useClass: UserCredentialFactory,
    },
    {
      provide: 'UserCredentialRepo',
      useFactory: (userCredentialFactory: UserCredentialAbstractFactory) => {
        UserCredentialAbstractFactory.setInstance(userCredentialFactory);
        return UserCredentialAbstractFactory.getInstance().createUserCredentialRepo();
      },
      inject: [UserCredentialAbstractFactory],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
