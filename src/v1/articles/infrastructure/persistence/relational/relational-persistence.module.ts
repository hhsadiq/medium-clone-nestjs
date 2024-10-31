import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleAbstractRepository } from '@src/v1/articles/infrastructure/persistence/article.abstract.repository';

import { ArticleEntity } from './entities/article.entity';
import { ArticleRelationalRepository } from './repositories/article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [
    {
      provide: ArticleAbstractRepository,
      useClass: ArticleRelationalRepository,
    },
  ],
  exports: [ArticleAbstractRepository],
})
export class RelationalArticlePersistenceModule {}
