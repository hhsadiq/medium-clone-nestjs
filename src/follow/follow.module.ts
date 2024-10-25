/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowController } from '@src/follow/follow.container';
import { FollowService } from '@src/follow/follow.service';
import { FollowEntity } from '@src/follow/infrastructure/persistence/relational/entities/follow.entity';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class UserFollowerModule {}
