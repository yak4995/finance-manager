import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as cls from 'cls-hooked';

import { FileLoggerService } from '@transport/logger/fileLogger.service';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly appName: string) {}

  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    // middleware -> guard -> interceptor -> validation pipe -> user`s handler -> interceptor -> exception filter

    const request: Request = context.switchToHttp().getRequest();
    // in GraphQL case
    if (!request) {
      return call$.handle();
    }
    const { method, url, body, query } = request;
    const now = Date.now();
    const session =
      cls.getNamespace(this.appName) ?? cls.createNamespace(this.appName);

    const params = { body, query };

    FileLoggerService.log(
      `${method} ${url} ${session.get('requestId')}; INPUT: ${JSON.stringify(
        params,
      )}`,
    );

    return call$
      .handle()
      .pipe(
        tap(data =>
          FileLoggerService.log(
            `${method} ${url} ${session.get(
              'requestId',
            )}; OUTPUT: ${JSON.stringify(data)} DURATION: ${Date.now() -
              now}ms`,
          ),
        ),
      )
      .pipe(
        catchError(error => {
          FileLoggerService.log(
            `${method} ${url} ${session.get(
              'requestId',
            )}; ERROR: ${JSON.stringify(
              JSON.stringify(error?.response ?? error),
            )}`,
          );
          throw error;
        }),
      );
  }
}
