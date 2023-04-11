// eslint-disable-next-line import/no-extraneous-dependencies
import { Response, Request } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { AnyObject } from 'interfaces';

const getResponseComments = (
  exceptionResponse: AnyObject,
  exception: AnyObject,
): string =>
  (
    exceptionResponse.message ||
    exception.message ||
    exceptionResponse.error
  ).toString();

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const reason = getResponseComments(response, exception);

    this.logger.error(
      `Error on ${request.method} ${request.url}, error: ${exception?.message}`,
    );

    response.status(status).json({ reason });
  }
}
