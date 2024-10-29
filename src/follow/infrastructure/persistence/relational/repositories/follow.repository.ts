import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FollowAbstractRepository } from '@src/follow/infrastructure/persistence/follow.abstract.repository';
import { FollowEntity } from '@src/follow/infrastructure/persistence/relational/entities/follow.entity';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class FollowRelationalRepository implements FollowAbstractRepository {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async getFollowings(
    userId: User['id'],
  ): Promise<NullableType<FollowEntity[]>> {
    if (userId && typeof userId === 'number') {
      const followings = await this.followRepository.find({
        where: { follower_id: userId },
      });

      return followings;
    }
    return null;
  }
}
