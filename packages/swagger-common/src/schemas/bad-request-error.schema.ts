import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorSchema {
  @ApiProperty({ description: 'Error details' })
  reason: string;
}
