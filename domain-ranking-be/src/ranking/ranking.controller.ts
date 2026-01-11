import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':domains')
  async getRank(@Param('domains') input: string) {
    const domainList = input.split(',').map(d => d.trim()).filter(d => d);

    // always return a list, even for one domain
    return this.rankingService.getRankings(domainList);
  }
}
