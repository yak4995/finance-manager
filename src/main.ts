import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import AppModule from './app.module';
import ConfigService from './infrastructure/ui/config/config.service';

async function bootstrap() {
  const configService: ConfigService = new ConfigService('.env');
  const keyFile: Buffer = fs.readFileSync(
    configService.get('SSL_KEY_FILE_PATH'),
  );
  const certFile: Buffer = fs.readFileSync(
    configService.get('SSL_CERT_FILE_PATH'),
  );
  const app: INestApplication = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
