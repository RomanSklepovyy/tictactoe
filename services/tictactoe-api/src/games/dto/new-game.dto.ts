import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewGameDto {
  @ApiProperty({
    maxLength: 9,
    minLength: 9,
    description: 'Initial game board',
    example: 'XO--X--OX',
  })
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  board: string;
}
