import { Module } from '@nestjs/common';

import { FilesModule } from '@src/v1/files/files.module';
import { ViewsModule } from '@src/v1/views/views.module';

import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, ViewsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
