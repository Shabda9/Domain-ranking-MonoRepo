import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':domains')
  async getRank(@Param('domains') input: string) {
    // 'abc.com, xyz.com, Redit.com, ,'
    const domainList = input
      .split(',') // gets separated using comma operator ['abc.com', 'xyz.com', 'Redit.com', ' ']
      .map((d) => d.trim().toLowerCase()) // makes all the domain to lowercase
      .filter((d) => d); // filtering the empty strings

    const uniqueDomainList = [...new Set(domainList)]; // removing the duplicates

    // always return a list, even for one domain
    return this.rankingService.getRankings(uniqueDomainList);
  }
}
