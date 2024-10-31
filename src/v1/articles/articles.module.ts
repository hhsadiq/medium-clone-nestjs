import { Module } from '@nestjs/common';

import { DatabaseHelperModule } from '@src/database-helpers/database-helper.module';
import { CommentsModule } from '@src/v1/comments/comments.module';
import { TagsModule } from '@src/v1/tags/tags.module';
import { UsersModule } from '@src/v1/users/users.module';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    UsersModule,
    CommentsModule,
    TagsModule,
    DatabaseHelperModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
