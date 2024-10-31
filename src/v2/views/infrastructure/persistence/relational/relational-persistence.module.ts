import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSummaryViewEntity } from '@src/v2/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { ViewsRelationalRepository } from '@src/v2/views/infrastructure/persistence/relational/repositories/view.repository';
import { ViewsAbstractRepository } from '@src/v2/views/infrastructure/persistence/view.abstract.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSummaryViewEntity])],
  providers: [
    {
      provide: ViewsAbstractRepository,
      useClass: ViewsRelationalRepository,
    },
  ],
  exports: [ViewsAbstractRepository],
})
export class RelationalviewsPersistenceModule {}
