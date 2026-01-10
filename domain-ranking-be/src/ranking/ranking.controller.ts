import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':domain')
  async getDomainRank(@Param('domain') domain: string) {
    return this.rankingService.getRanking(domain);
  }
}
