import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowAbstractRepository } from '@src/follow/infrastructure/persistence/follow.abstract.repository';
import { FollowEntity } from '@src/follow/infrastructure/persistence/relational/entities/follow.entity';
import { FollowRelationalRepository } from '@src/follow/infrastructure/persistence/relational/repositories/follow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  providers: [
    {
      provide: FollowAbstractRepository,
      useClass: FollowRelationalRepository,
    },
  ],
  exports: [FollowAbstractRepository],
})
export class RelationalFollowPersistenceModule {}
