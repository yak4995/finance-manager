import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../../persistance/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UserCredentialFactory } from '../../persistance/factories/userCredential.factory';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import { UserCredentialCreator } from '../../persistance/creators/userCredential.creator';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import { UserCredentialRepository } from '../../persistance/repositories/userCredential.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
  providers: [
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
})
export class UsersModule {}
