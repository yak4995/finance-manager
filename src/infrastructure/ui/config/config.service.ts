import ConfigInterface from './config.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: ConfigInterface | dotenv.DotenvParseOutput;

  constructor(filePath: string) {
    const configExists = fs.existsSync(filePath);
    this.envConfig = Object.assign(
      {},
      process.env,
      configExists && dotenv.parse(fs.readFileSync(filePath)),
    );
  }

  get<T extends ConfigInterface, K extends keyof ConfigInterface>(
    key: K,
  ): T[K] {
    return this.envConfig[key] as T[K];
  }
}
