import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponseMetadata } from '@nestjs/swagger';

export function SuccessCreationResponseDecorator(
  apiResponseMetadata: ApiResponseMetadata = {},
) {
  return applyDecorators(
    ApiCreatedResponse({
      status: 201,
      description: 'Created Successfully',
      ...apiResponseMetadata,
    }),
  );
}
