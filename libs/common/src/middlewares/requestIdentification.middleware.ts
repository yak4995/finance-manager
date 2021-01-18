import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as cls from 'cls-hooked';
import * as uuid from 'uuid';

@Injectable()
export default class RequestIdentificationMiddleware implements NestMiddleware {
  constructor(
    @Inject('appName')
    private readonly appName: string,
  ) {}

  use(request: Request, response: Response, next: () => void): void {
    const session =
      cls.getNamespace(this.appName) ?? cls.createNamespace(this.appName);
    session.bind(request);
    session.bind(response);

    const requestId = uuid.v4();

    session.run(() => {
      session.set('requestContext', {
        request,
        response,
        appName: this.appName,
      });
      session.set('requestId', requestId);
      next();
    });
  }
}
