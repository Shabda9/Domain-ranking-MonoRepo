import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.model';

@Module({
  imports: [SequelizeModule.forFeature([Ranking])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
