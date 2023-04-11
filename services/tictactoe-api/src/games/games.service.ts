import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStatus, GameUpdate } from 'interfaces';

import { Game as GameEntity } from './entities/game.entity';
import { GameBoardDto } from './dto/game-board.dto';
import { GamesUtils } from './games.utils';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async getList(): Promise<Game[]> {
    return this.gameRepository.find({
      take: 200,
    });
  }

  async get(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException(`Game ${id} not found`);
    }

    return game;
  }

  async create(newGameDto: GameBoardDto): Promise<Game> {
    const newGame = await this.gameRepository.create(newGameDto);
    return this.gameRepository.save(newGame);
  }

  async delete(id: string): Promise<Game> {
    const game = await this.get(id);
    return this.gameRepository.remove(game);
  }

  async updateBoard(id: string, gameUpdate: GameUpdate): Promise<Game> {
    const game = await this.gameRepository.preload({
      id,
      ...gameUpdate,
    });

    if (!game) {
      throw new NotFoundException(`Game ${id} not found`);
    }

    return this.gameRepository.save(game);
  }

  async registerUserMove(
    id: string,
    gameBoardDto: GameBoardDto,
  ): Promise<Game> {
    const { board: updatedBoard } = gameBoardDto;
    const { board: currentBoard, status } = await this.get(id);

    const isMoveValid = GamesUtils.isMoveValid(currentBoard, updatedBoard);

    if (!isMoveValid) {
      throw new BadRequestException('Move is invalid!');
    }

    const isStatusValid = status === GameStatus.running;

    if (!isStatusValid) {
      throw new BadRequestException('The game is already finished');
    }

    const updatedStatus = await GamesUtils.getGameStatusAfterUserMove(
      updatedBoard,
    );

    const gameUpdate = { board: updatedBoard, status: updatedStatus };
    return this.updateBoard(id, gameUpdate);
  }

  async makeComputerMove(game: Game): Promise<Game> {
    const { id, board, status } = game;

    const isStatusValid = status === GameStatus.running;
    if (!isStatusValid) return game;

    const updatedBoard = GamesUtils.updateBoardWithComputerMove(board);
    const updatedStatus = GamesUtils.getGameStatusAfterComputerMove(board);

    const gameUpdate = { board: updatedBoard, status: updatedStatus };
    return this.updateBoard(id, gameUpdate);
  }
}
