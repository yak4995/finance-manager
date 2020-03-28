import ConfigInterface from './config.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { MailerOptions, PugAdapter } from '@nestjs-modules/mailer';

export default class ConfigService {
  private readonly envConfig: ConfigInterface | dotenv.DotenvParseOutput;

  constructor(filePath: string) {
    const configExists: boolean = fs.existsSync(filePath);
    this.envConfig = Object.assign(
      {},
      process.env,
      configExists && dotenv.parse(fs.readFileSync(filePath)),
    );
  }

  getMailServiceConfiguration(): MailerOptions {
    return {
      transport: {
        host: this.get('SMTP_HOST'),
        port: Number(this.get('SMTP_PORT')),
        ssl: false,
        tls: true,
        auth: {
          user: this.get('SMTP_USER'),
          pass: this.get('SMTP_PASSWORD'),
        },
      },
      defaults: {
        from: this.get('SMTP_FROM'),
      },
      template: {
        adapter: new PugAdapter(),
        dir: join(
          __dirname,
          '../../../..',
          String(this.get('MAIL_TEMPLATES_PATH')),
        ),
      },
    };
  }

  get<T extends ConfigInterface, K extends keyof ConfigInterface>(
    key: K,
  ): T[K] {
    return this.envConfig[key] as T[K];
  }
}
