import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'interfaces';

import { Game as GameEntity } from './entities/game.entity';
import { GameBoardDto } from './dto/game-board.dto';

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

  async updateBoard(id: string, board: string): Promise<Game> {
    const game = await this.gameRepository.preload({
      id,
      board,
    });

    if (!game) {
      throw new NotFoundException(`Game ${id} not found`);
    }

    return this.gameRepository.save(game);
  }

  async registerMove(id: string, gameBoardDto: GameBoardDto): Promise<Game> {
    const { board } = gameBoardDto;
    return this.updateBoard(id, board);
  }

  async makeMove(game: Game): Promise<Game> {
    const { id, board } = game;
    return this.updateBoard(id, board);
  }
}
