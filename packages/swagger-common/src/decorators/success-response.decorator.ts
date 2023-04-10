import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponseMetadata } from '@nestjs/swagger';

export function SuccessResponseDecorator(
  apiResponseMetadata: ApiResponseMetadata = {},
) {
  return applyDecorators(
    ApiOkResponse({
      status: 200,
      description: 'Success Response',
      ...apiResponseMetadata,
    }),
  );
}
