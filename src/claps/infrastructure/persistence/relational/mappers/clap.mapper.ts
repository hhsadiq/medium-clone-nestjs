import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { Clap } from '@src/claps/domain/clap';
import { ClapEntity } from '@src/claps/infrastructure/persistence/relational/entities/clap.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class ClapMapper {
  static toDomain(raw: ClapEntity): Clap {
    const domainEntity = new Clap();
    domainEntity.id = raw.id;
    domainEntity.articleId = raw.article_id;
    domainEntity.userId = raw.user_id;
    domainEntity.counter = raw.counter;

    if (raw.article) {
      domainEntity.article = ArticleMapper.toDomain(raw.article);
    }
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Clap): ClapEntity {
    const persistenceEntity = new ClapEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.article_id = domainEntity.articleId;
    persistenceEntity.user_id = domainEntity.userId;
    persistenceEntity.counter = domainEntity.counter;
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
