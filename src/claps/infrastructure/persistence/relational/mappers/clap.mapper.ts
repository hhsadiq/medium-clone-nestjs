import { Clap } from '@src/claps/domain/clap';
import { ClapEntity } from '@src/claps/infrastructure/persistence/relational/entities/clap.entity';

export class ClapMapper {
  static toDomain(raw: ClapEntity): Clap {
    const domainEntity = new Clap();
    domainEntity.counter = raw.counter;

    domainEntity.userId = raw.user_id;

    domainEntity.articleId = raw.article_id;

    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Clap): ClapEntity {
    const persistenceEntity = new ClapEntity();
    persistenceEntity.counter = domainEntity.counter;

    persistenceEntity.user_id = domainEntity.userId;

    persistenceEntity.article_id = domainEntity.articleId;

    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
