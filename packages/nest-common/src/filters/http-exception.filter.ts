// eslint-disable-next-line import/no-extraneous-dependencies
import { Response, Request } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { AnyObject, ResponseBody } from 'interfaces';

const getResponseComments = (
  exceptionResponse: AnyObject,
  exception: AnyObject,
): string =>
  (
    exceptionResponse.message ||
    exception.message ||
    exceptionResponse.error
  ).toString();

const getResponseBody = (exception) => {
  const status = exception.getStatus();
  const exceptionResponse = exception.getResponse();

  if (typeof exceptionResponse === 'object') {
    const responseBody: ResponseBody = {
      status,
      comments: getResponseComments(exceptionResponse, exception),
      data: {},
    };

    return responseBody;
  }

  const responseBody: ResponseBody = {
    status,
    comments: exceptionResponse,
    data: {},
  };

  return responseBody;
};

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const responseBody = getResponseBody(exception);

    this.logger.error(
      `Error on ${request.method} ${request.url}, error: ${exception?.message}`,
    );

    response.status(responseBody.status).json(responseBody);
  }
}
