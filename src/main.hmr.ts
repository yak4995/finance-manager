import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import AppModule from './app.module';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const keyFile: Buffer = fs.readFileSync(
    process.env.SSL_KEY_FILE_PATH ?? 'ssl/client-1.local.key',
  );
  const certFile: Buffer = fs.readFileSync(
    process.env.SSL_CERT_FILE_PATH ?? 'ssl/client-1.local.crt',
  );
  const app: INestApplication = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
