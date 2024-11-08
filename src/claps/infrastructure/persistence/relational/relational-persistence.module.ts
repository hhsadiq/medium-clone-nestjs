import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { ClapAbstractRepository } from '@src/claps/infrastructure/persistence/clap.abstract.repository';

import { ClapEntity } from './entities/clap.entity';
import { ClapRelationalRepository } from './repositories/clap.repository';
@Module({
  imports: [TypeOrmModule.forFeature([ClapEntity, ArticleEntity])],
  providers: [
    {
      provide: ClapAbstractRepository,
      useClass: ClapRelationalRepository,
    },
  ],
  exports: [ClapAbstractRepository],
})
export class RelationalClapPersistenceModule {}
