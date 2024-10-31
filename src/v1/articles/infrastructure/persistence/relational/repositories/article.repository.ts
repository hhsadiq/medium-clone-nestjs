import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';
import { ArticleDTOWithTagDomains } from '@src/v1/articles/articles.types';
import { Article } from '@src/v1/articles/domain/article';
import { ArticleAbstractRepository } from '@src/v1/articles/infrastructure/persistence/article.abstract.repository';
import { ArticleEntity } from '@src/v1/articles/infrastructure/persistence/relational/entities/article.entity';
import { ArticleMapper } from '@src/v1/articles/infrastructure/persistence/relational/mappers/article.mapper';

@Injectable()
export class ArticleRelationalRepository implements ArticleAbstractRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(data: ArticleDTOWithTagDomains): Promise<Article> {
    const persistenceModel =
      ArticleMapper.toPersistenceFromDTOWithTagDomains(data);

    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );

    return ArticleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]> {
    const entities = await this.articleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return entities.map((entity) => ArticleMapper.toDomain(entity));
  }

  async findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Article[], number]> {
    const [entities, total] = await this.articleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const data: Article[] = entities.map((entity) =>
      ArticleMapper.toDomain(entity),
    );
    return [data, total];
  }

  async findById(id: Article['id']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findByIdWithRelations(
    id: Article['id'],
  ): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
      relations: {
        author: true,
        tagList: true,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: Article['slug']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { slug },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async update(entity: Article, payload: Partial<Article>): Promise<Article> {
    const updatedEntity = await this.articleRepository.save(
      this.articleRepository.create(
        ArticleMapper.toPersistence({
          ...entity,
          ...payload,
        }),
      ),
    );

    return ArticleMapper.toDomain(updatedEntity);
  }

  async remove(id: Article['id']): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
