import { Clap } from '@src/claps/domain/clap';
import { ClapEntity } from '@src/claps/infrastructure/persistence/relational/entities/clap.entity';

export class ClapMapper {
  static toDomain(raw: ClapEntity): Clap {
    const domainEntity = new Clap();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Clap): ClapEntity {
    const persistenceEntity = new ClapEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
