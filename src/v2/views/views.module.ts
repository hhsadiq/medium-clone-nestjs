import { Module } from '@nestjs/common';

import { RelationalviewsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ViewsService } from './views.service';

@Module({
  imports: [RelationalviewsPersistenceModule],
  providers: [ViewsService],
  exports: [ViewsService, RelationalviewsPersistenceModule],
})
export class ViewsModule {}
