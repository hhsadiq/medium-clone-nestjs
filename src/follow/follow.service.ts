/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '@src/follow/domain/profile';
import { FollowMapper } from '@src/follow/infrastructure/persistence/mappers/follow.mapper';
import { FollowEntity } from '@src/follow/infrastructure/persistence/relational/entities/follow.entity';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(FollowEntity)
    private readonly userFollowerRepository: Repository<FollowEntity>,
  ) {}

  async followUser(followerId: number, username: string): Promise<Profile> {
    const userToFollow = await this.userRepository.findOne({
      where: { first_name: username },
    });
    if (!userToFollow) {
      throw new NotFoundException(
        `User with username "${username}" not found.`,
      );
    }

    if (followerId == userToFollow.id)
      throw new BadRequestException(`You cannot follow yourself.`);

    const alreadyFollowing = await this.userFollowerRepository.findOne({
      where: { follower_id: followerId, following_id: userToFollow.id },
    });

    if (alreadyFollowing) {
      throw new BadRequestException(`You are already following ${username}.`);
    }

    const follow = this.userFollowerRepository.create({
      follower_id: followerId,
      following_id: userToFollow.id,
    });

    await this.userFollowerRepository.save(follow);

    return FollowMapper.toDomain(userToFollow, true);
  }

  async unfollowUser(followerId: number, username: string): Promise<Profile> {
    const userToUnfollow = await this.userRepository.findOne({
      where: { first_name: username },
    });
    if (!userToUnfollow) {
      throw new NotFoundException(
        `User with username "${username}" not found.`,
      );
    }

    const alreadyFollowing = await this.userFollowerRepository.findOne({
      where: { follower_id: followerId, following_id: userToUnfollow.id },
    });

    if (!alreadyFollowing) {
      throw new BadRequestException(
        `You are already not following ${username}.`,
      );
    }

    await this.userFollowerRepository.delete(alreadyFollowing.id);

    return FollowMapper.toDomain(userToUnfollow, false);
  }
}
