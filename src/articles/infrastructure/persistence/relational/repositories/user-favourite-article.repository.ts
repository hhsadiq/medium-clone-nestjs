import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Article } from '@src/articles/domain/article';
import { UserFavouriteArticle } from '@src/articles/domain/user-favourite-article';
import { UserFavouriteArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/user-favourite-article.entity';
import { UserFavouriteArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/user-favourite-article.mapper';
import { UserFavouriteArticleAbstractRepository } from '@src/articles/infrastructure/persistence/user-favourite-article.abstract.repository';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class UserFavouriteArticleRelationalRepository
  implements UserFavouriteArticleAbstractRepository
{
  constructor(
    @InjectRepository(UserFavouriteArticleEntity)
    private readonly userFavouriteArticleRepository: Repository<UserFavouriteArticleEntity>,
  ) {}

  async create(data: UserFavouriteArticle): Promise<UserFavouriteArticle> {
    const persistenceModel = UserFavouriteArticleMapper.toPersistence(data);
    const newEntity = await this.userFavouriteArticleRepository.save(
      this.userFavouriteArticleRepository.create(persistenceModel),
    );
    return UserFavouriteArticleMapper.toDomain(newEntity);
  }

  async remove(id: UserFavouriteArticle['id']): Promise<void> {
    await this.userFavouriteArticleRepository.delete(id);
  }

  async countFavouritesByArticleId(articleId: Article['id']): Promise<number> {
    return await this.userFavouriteArticleRepository.count({
      where: { article_id: articleId },
    });
  }

  async findByUserIdArticleId(
    userId: User['id'],
    articleId: Article['id'],
  ): Promise<NullableType<UserFavouriteArticle>> {
    if (userId && typeof userId === 'number') {
      const entity = await this.userFavouriteArticleRepository.findOne({
        where: {
          user_id: userId,
          article_id: articleId,
        },
        relations: {
          user: true,
          article: true,
        },
      });

      return entity ? UserFavouriteArticleMapper.toDomain(entity) : null;
    }
    return null;
  }
  async findByUserIds(userIds: number[]): Promise<UserFavouriteArticle[]> {
    const entities = await this.userFavouriteArticleRepository.find({
      where: {
        user_id: In(userIds),
      },
    });
    return entities.map((entity) =>
      UserFavouriteArticleMapper.toDomain(entity),
    );
  }
}
