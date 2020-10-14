import { Global, Module } from '@nestjs/common';
import { FileLoggerService } from './fileLogger.service';

@Global()
@Module({
  providers: [FileLoggerService],
  exports: [FileLoggerService],
})
export class LoggerModule {}
