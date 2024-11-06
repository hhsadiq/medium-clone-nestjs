import { Module } from '@nestjs/common';

import { ArticlesModule } from '@src/articles/articles.module';

import { ClapsController } from './claps.controller';
import { ClapsService } from './claps.service';
import { RelationalClapPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalClapPersistenceModule, ArticlesModule],
  controllers: [ClapsController],
  providers: [ClapsService],
  exports: [ClapsService],
})
export class ClapsModule {}
