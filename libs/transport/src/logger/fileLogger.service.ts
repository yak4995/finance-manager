import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileLoggerService extends Logger {
  private static readonly logsDestinationPath: string = `${process.cwd()}/logs`;

  constructor() {
    super();
    if (!fs.existsSync(FileLoggerService.logsDestinationPath)) {
      fs.mkdirSync(FileLoggerService.logsDestinationPath);
    }
  }

  public static log(message: string, context?: string): void {
    const now = [...new Date().toUTCString().split(' ')];
    fs.appendFile(
      `${FileLoggerService.logsDestinationPath}/${now[1]} ${now[2]} ${now[3]}.txt`,
      JSON.stringify({
        message,
        context,
        environment: `${process.env.DEBUG_MODE === '1' ? 'DEV' : 'PROD'}`,
      }) + '\n',
      {},
      err => {
        if (err) {
          console.log(err);
        }
      },
    );
  }

  public static error(message: string, trace?: string, context?: string): void {
    const now = [...new Date().toUTCString().split(' ')];
    fs.appendFile(
      `${FileLoggerService.logsDestinationPath}/${now[1]} ${now[2]} ${now[3]}.txt`,
      JSON.stringify({
        message,
        trace,
        context,
        environment: `${process.env.DEBUG_MODE === '1' ? 'DEV' : 'PROD'}`,
      }) + '\n',
      {},
      err => {
        if (err) {
          console.log(err);
        }
      },
    );
  }
}
