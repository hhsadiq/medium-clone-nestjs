import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { Clap } from '@src/claps/domain/clap';
import { ClapEntity } from '@src/claps/infrastructure/persistence/relational/entities/clap.entity';
import { ClapMapper } from '@src/claps/infrastructure/persistence/relational/mappers/clap.mapper';

@Injectable()
export class ClapRelationalRepository {
  constructor(
    @InjectRepository(ClapEntity)
    private readonly clapRepository: Repository<ClapEntity>,
  ) {}

  async createOrIncrement(articleId: string, userId: number): Promise<Clap> {
    return await this.clapRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const existingClap = await transactionalEntityManager.findOne(
          ClapEntity,
          {
            where: { article_id: articleId, user_id: userId },
          },
        );

        const counterIncVal = 1;
        let clap: ClapEntity;

        if (existingClap) {
          existingClap.counter += counterIncVal;
          clap = await transactionalEntityManager.save(
            ClapEntity,
            existingClap,
          );
        } else {
          const newClap = transactionalEntityManager.create(ClapEntity, {
            article_id: articleId,
            user_id: userId,
            counter: counterIncVal,
          });
          clap = await transactionalEntityManager.save(ClapEntity, newClap);
        }

        const totalClaps = await transactionalEntityManager
          .createQueryBuilder(ClapEntity, 'clap')
          .select('SUM(clap.counter)', 'total')
          .where('clap.article_id = :articleId', { articleId })
          .getRawOne()
          .then((result) => parseInt(result.total) || 0);

        await transactionalEntityManager
          .createQueryBuilder()
          .update(ArticleEntity)
          .set({ totalClaps })
          .where('id = :articleId', { articleId })
          .execute();

        return ClapMapper.toDomain(clap);
      },
    );
  }
}
