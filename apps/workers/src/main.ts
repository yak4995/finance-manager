import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import WorkersModule from './workers.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkersModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${process.env.IS_LOCAL ? '127.0.0.1' : 'kafka'}:9092`],
        },
        consumer: {
          groupId: 'workers',
        },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());

  app.listen();
}
bootstrap();
