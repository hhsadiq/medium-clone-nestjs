import { FollowEntity } from '@src/follow/infrastructure/persistence/relational/entities/follow.entity';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FollowAbstractRepository {
  abstract getFollowings(
    userId: User['id'],
  ): Promise<NullableType<FollowEntity[]>>;
}
