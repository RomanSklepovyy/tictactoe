import { ApiProperty } from '@nestjs/swagger';

export class NewGameResponseSchema {
  @ApiProperty({
    description: 'The board state',
    example: 'localhost/3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  location: string;
}
