import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [CommonModule, GamesModule],
})
export class AppModule {}
