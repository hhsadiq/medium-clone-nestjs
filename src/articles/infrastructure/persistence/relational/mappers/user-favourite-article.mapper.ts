import { UserFavouriteArticle } from '@src/articles/domain/user-favourite-article';
import { UserFavouriteArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/user-favourite-article.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class UserFavouriteArticleMapper {
  static toDomain(raw: UserFavouriteArticleEntity): UserFavouriteArticle {
    const domainEntity = new UserFavouriteArticle();
    domainEntity.id = raw.id;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    if (raw.article) {
      domainEntity.article = ArticleMapper.toDomain(raw.article);
    }
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: UserFavouriteArticle,
  ): UserFavouriteArticleEntity {
    const persistenceEntity = new UserFavouriteArticleEntity();

    if (domainEntity.userId && typeof domainEntity.userId === 'number') {
      persistenceEntity.user_id = domainEntity.userId;
    }
    persistenceEntity.article_id = domainEntity.articleId;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
