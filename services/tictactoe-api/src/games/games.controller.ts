import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Game, NewGameResponse } from 'interfaces';
import {
  BadRequestDecorator,
  SuccessCreationResponseDecorator,
  SuccessResponseDecorator,
} from 'swagger-common';

import { GameResponseSchema } from './swagger-schemas/game.response-schema';
import { GameBoardDto } from './dto/game-board.dto';
import { NewGameResponseSchema } from './swagger-schemas/new-game.response-schema';
import { GamesService } from './games.service';

@ApiTags('games')
@BadRequestDecorator()
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @SuccessResponseDecorator({ type: GameResponseSchema, isArray: true })
  async getList(): Promise<Array<Game>> {
    return this.gamesService.getList();
  }

  @Get(':game_id')
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  @ApiOperation({ summary: 'Get game by ID' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  async get(
    @Param('game_id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Game> {
    return this.gamesService.get(id);
  }

  @Post()
  @ApiOperation({ summary: 'Start a new game' })
  @SuccessCreationResponseDecorator({
    headers: { location: { description: 'New game URL', example: 'string' } },
    type: NewGameResponseSchema,
    description: 'New game started',
  })
  async create(@Body() newGameDto: GameBoardDto): Promise<NewGameResponse> {
    const { id } = await this.gamesService.create(newGameDto);
    return { location: `localhost:3000/${id}` };
  }

  @Put(':game_id')
  @ApiOperation({ summary: 'Post a move' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  async move(
    @Param('game_id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() gameBoardDto: GameBoardDto,
  ): Promise<Game> {
    return this.gamesService.registerMove(id, gameBoardDto);
  }

  @Delete(':game_id')
  @ApiOperation({ summary: 'Delete the game' })
  @SuccessResponseDecorator({ type: GameResponseSchema })
  @ApiParam({
    name: 'game_id',
    required: true,
    description: 'Game ID',
  })
  async delete(
    @Param('game_id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.gamesService.delete(id);
  }
}
