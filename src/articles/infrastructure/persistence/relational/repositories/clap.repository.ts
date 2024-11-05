import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clap } from '@src/articles/domain/clap';
import { ClapEntity } from '@src/articles/infrastructure/persistence/relational/entities/clap.entity';
import { ClapMapper } from '@src/articles/infrastructure/persistence/relational/mappers/clap.mapper';

@Injectable()
export class ClapRelationalRepository {
  constructor(
    @InjectRepository(ClapEntity)
    private readonly clapRepository: Repository<ClapEntity>,
  ) {}

  async createOrIncrement(articleId: string, userId: number): Promise<Clap> {
    const existingClap = await this.clapRepository.findOne({
      where: { article_id: articleId, user_id: userId },
    });

    const counterIncVal = 1;
    if (existingClap) {
      existingClap.counter += counterIncVal;
      const updatedClap = await this.clapRepository.save(existingClap);
      return ClapMapper.toDomain(updatedClap);
    }

    const newClap = this.clapRepository.create({
      article_id: articleId,
      user_id: userId,
      counter: counterIncVal,
    });

    const savedClap = await this.clapRepository.save(newClap);
    return ClapMapper.toDomain(savedClap);
  }

  async getTotalClaps(articleId: string): Promise<number> {
    const result = await this.clapRepository
      .createQueryBuilder('clap')
      .select('SUM(clap.counter)', 'total')
      .where('clap.article_id = :articleId', { articleId })
      .getRawOne();

    return result.total || 0;
  }
}
