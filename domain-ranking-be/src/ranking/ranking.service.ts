import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ranking } from './ranking.model';
import axios from 'axios';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Ranking)
    private rankingModel: typeof Ranking,
  ) {}

  async getRanking(domain: string) {
    // Check DB for data of the domainname from today?
    const today = new Date().toISOString().slice(0, 10); // "2025-01-09"

    const cachedData = await this.rankingModel.findAll({
      where: { domain },
      order: [['date', 'ASC']],
    });

    // check if the data is latest one is from today
    const hasTodayData = cachedData.length > 0 && cachedData[cachedData.length - 1].date === today;

    if (hasTodayData) {
      console.log(`[CACHE HIT] Found data for ${domain}`);
      return cachedData;
    }

    // fresh data, fetch from Tranco API
    console.log(`[API CALL] Fetching fresh data for ${domain}...`);
    try {
      // Tranco API URL
      const url = `https://tranco-list.eu/api/ranks/domain/${domain}`;
      const response = await axios.get<TrancoApiResponse>(url);

      const apiRanks = response.data.ranks;

      // Prepare data to save
      const recordsToSave = apiRanks.map((r) => ({
        domain: domain,
        date: r.date,
        rank: r.rank,
      }));

      // Save to Database (Clean up old data first to avoid duplicates)
      await this.rankingModel.destroy({ where: { domain } });
      await this.rankingModel.bulkCreate(recordsToSave);

      return recordsToSave;
    } catch (error) {
      console.error('Error fetching from Tranco:', error.message);
      // If API fails, returning whatever old data we have
      return cachedData;
    }
  }
}

interface TrancoRank {
  date: string;
  rank: number;
}

interface TrancoApiResponse {
  ranks: TrancoRank[];
}
