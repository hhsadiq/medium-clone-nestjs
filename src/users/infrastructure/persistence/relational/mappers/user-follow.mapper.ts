import { UserFollow } from '@src/users/domain/user-follow';
import { UserFollowEntity } from '@src/users/infrastructure/persistence/relational/entities/user-follow.entity';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class UserFollowMapper {
  static toDomain(raw: UserFollowEntity): UserFollow {
    const domainEntity = new UserFollow();
    domainEntity.id = raw.id;
    if (raw.follower) {
      domainEntity.follower = UserMapper.toDomain(raw.follower);
    }

    if (raw.following) {
      domainEntity.following = UserMapper.toDomain(raw.following);
    }

    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserFollow): UserFollowEntity {
    const persistenceEntity = new UserFollowEntity();

    persistenceEntity.id = domainEntity.id;

    if (domainEntity.follower) {
      persistenceEntity.follower = new UserEntity();
      persistenceEntity.follower.id = Number(domainEntity.follower.id);
    }

    if (domainEntity.following) {
      persistenceEntity.following = new UserEntity();
      persistenceEntity.following.id = Number(domainEntity.following.id);
    }

    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
