import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/ui/auth/auth.module';
import { AuthService } from './infrastructure/ui/auth/auth.service';
import { UsersModule } from './infrastructure/ui/users/users.module';
import { UsersService } from './infrastructure/ui/users/users.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
