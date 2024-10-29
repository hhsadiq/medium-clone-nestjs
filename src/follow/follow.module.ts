import { Module } from '@nestjs/common';

import { FollowService } from '@src/follow/follow.service';
import { RelationalFollowPersistenceModule } from '@src/follow/infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [RelationalFollowPersistenceModule, UsersModule],
  providers: [FollowService],
  exports: [FollowService, RelationalFollowPersistenceModule],
})
export class FollowModule {}
