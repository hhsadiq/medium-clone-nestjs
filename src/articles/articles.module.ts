import { Module } from '@nestjs/common';

import { RelationalUserFavouriteArticlePersistenceModule } from '@src/articles/infrastructure/persistence/relational/relational-user-favourite-article-persistence.module';
import { CommentsModule } from '@src/comments/comments.module';
import { DatabaseHelperModule } from '@src/database-helpers/database-helper.module';
import { FollowModule } from '@src/follow/follow.module';
import { TagsModule } from '@src/tags/tags.module';
import { UsersModule } from '@src/users/users.module';

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
    RelationalUserFavouriteArticlePersistenceModule,
    FollowModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [
    ArticlesService,
    RelationalArticlePersistenceModule,
    RelationalUserFavouriteArticlePersistenceModule,
  ],
})
export class ArticlesModule {}
