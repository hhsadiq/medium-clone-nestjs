import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clap } from '@src/claps/domain/clap';
import { ClapAbstractRepository } from '@src/claps/infrastructure/persistence/clap.abstract.repository';
import { ClapEntity } from '@src/claps/infrastructure/persistence/relational/entities/clap.entity';
import { ClapMapper } from '@src/claps/infrastructure/persistence/relational/mappers/clap.mapper';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class ClapRelationalRepository implements ClapAbstractRepository {
  constructor(
    @InjectRepository(ClapEntity)
    private readonly clapRepository: Repository<ClapEntity>,
  ) {}

  async create(data: Clap): Promise<Clap> {
    const persistenceModel = ClapMapper.toPersistence(data);
    const newEntity = await this.clapRepository.save(
      this.clapRepository.create(persistenceModel),
    );
    return ClapMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Clap[]> {
    const entities = await this.clapRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ClapMapper.toDomain(entity));
  }

  async findByArticleIdAndUserId(
    articleId: Clap['articleId'],
    userId: Clap['userId'],
  ): Promise<NullableType<Clap>> {
    const entity = await this.clapRepository.findOne({
      where: {
        article_id: articleId,
        user_id: +userId,
      },
    });
    return entity ? ClapMapper.toDomain(entity) : null;
  }

  async incrementCounter(
    articleId: Clap['articleId'],
    userId: Clap['userId'],
  ): Promise<NullableType<Clap>> {
    await this.clapRepository.increment(
      { article_id: articleId, user_id: +userId },
      'counter',
      1,
    );
    return await this.findByArticleIdAndUserId(articleId, userId);
  }
}
