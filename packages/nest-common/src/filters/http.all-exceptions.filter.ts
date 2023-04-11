import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

@Catch()
export class HttpAllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpAllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `Error on ${request?.method} ${request?.url}, error: ${exception?.message}\n${exception.stack}`,
    );

    response.status(status).json({ reason: exception?.message });
  }
}
