import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // in GraphQL case
    if (!request) {
      throw exception;
    }
    const status = exception.getStatus();
    let message = exception.message;
    if (!message && status === 401) {
      message = 'Incorrect token';
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack: exception.stack,
    };

    Logger.error(errorResponse);

    response.status(status).json(errorResponse);
  }
}
