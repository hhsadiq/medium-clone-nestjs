import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagAbstractRepository } from '@src/v1/tags/infrastructure/persistence/tag.abstract.repository';

import { TagEntity } from './entities/tag.entity';
import { TagRelationalRepository } from './repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [
    {
      provide: TagAbstractRepository,
      useClass: TagRelationalRepository,
    },
  ],
  exports: [TagAbstractRepository],
})
export class RelationalTagPersistenceModule {}
