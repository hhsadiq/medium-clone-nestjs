import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@src/v2/users/infrastructure/persistence/relational/entities/user.entity';

import { UserSeedService } from './user-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
