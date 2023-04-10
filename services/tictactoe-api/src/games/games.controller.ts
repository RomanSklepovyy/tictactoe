import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Game, GameStatus, NewGameResponse } from 'interfaces';
import {
  BadRequestDecorator,
  SuccessCreationResponseDecorator,
  SuccessResponseDecorator,
} from 'swagger-common';
import { GameResponseSchema } from './swagger-schemas/game.response-schema';
import { NewGameDto } from './dto/new-game.dto';
import { NewGameResponseSchema } from './swagger-schemas/new-game.response-schema';

@ApiTags('games')
@BadRequestDecorator()
@Controller('games')
export class GamesController {
  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @SuccessResponseDecorator({ type: GameResponseSchema, isArray: true })
  async getList(): Promise<Array<Game>> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  @Get(':game_id')
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  @ApiOperation({ summary: 'Get game by ID' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  async get(@Param('game_id') id: string): Promise<Game> {
    return { id: 'test', board: '---------', status: GameStatus.running };
  }

  @Post()
  @ApiOperation({ summary: 'Start a new game' })
  @SuccessCreationResponseDecorator({
    headers: { location: { description: 'New game URL', example: 'string' } },
    type: NewGameResponseSchema,
    description: 'New game started',
  })
  async create(@Body() newGameDto: NewGameDto): Promise<NewGameResponse> {
    return { location: 'test' };
  }

  @Put()
  @ApiOperation({ summary: 'Post a move' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  async move(@Param('game_id') id: string): Promise<Game> {
    return { id: 'test', board: '---------', status: GameStatus.running };
  }

  @Delete(':game_id')
  @ApiOperation({ summary: 'Delete the game' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  async delete(@Param('game_id') id: string): Promise<Game> {
    return { id: 'test', board: '---------', status: GameStatus.running };
  }
}
