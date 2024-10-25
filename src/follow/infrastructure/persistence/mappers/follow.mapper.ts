/* eslint-disable prettier/prettier */
import { FileMapper } from '@src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { Profile } from '@src/follow/domain/profile';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

export class FollowMapper {
  static toDomain(raw: UserEntity, isFollowing: boolean): Profile {
    const domainEntity = new Profile();
    domainEntity.username = raw.first_name;
    if (raw.photo) {
      domainEntity.photo = FileMapper.toDomain(raw.photo);
    }
    domainEntity.following = isFollowing;
    return domainEntity;
  }
}
