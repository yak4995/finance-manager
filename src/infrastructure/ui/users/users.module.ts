import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../persistance/prisma/prisma.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
