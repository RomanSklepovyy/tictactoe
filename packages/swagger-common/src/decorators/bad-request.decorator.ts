import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { BadRequestErrorSchema } from '../schemas';

export function BadRequestDecorator() {
  return applyDecorators(
    ApiBadRequestResponse({
      status: 400,
      description: 'Bad Request Response',
      type: BadRequestErrorSchema,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'Resource not found',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}
