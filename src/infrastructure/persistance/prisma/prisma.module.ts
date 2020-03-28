import { Module } from '@nestjs/common';
import PrismaService from './prisma.service';
import ConfigModule from '../../ui/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class PrismaModule {}
