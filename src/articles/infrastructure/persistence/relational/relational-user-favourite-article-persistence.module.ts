import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserFavouriteArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/user-favourite-article.entity';
import { UserFavouriteArticleRelationalRepository } from '@src/articles/infrastructure/persistence/relational/repositories/user-favourite-article.repository';
import { UserFavouriteArticleAbstractRepository } from '@src/articles/infrastructure/persistence/user-favourite-article.abstract.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavouriteArticleEntity])],
  providers: [
    {
      provide: UserFavouriteArticleAbstractRepository,
      useClass: UserFavouriteArticleRelationalRepository,
    },
  ],
  exports: [UserFavouriteArticleAbstractRepository],
})
export class RelationalUserFavouriteArticlePersistenceModule {}
