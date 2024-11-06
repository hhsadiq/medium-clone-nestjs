import { Module } from '@nestjs/common';

import { ClapsService } from './claps.service';
import { RelationalClapPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalClapPersistenceModule],
  providers: [ClapsService],
  exports: [ClapsService, RelationalClapPersistenceModule],
})
export class ClapsModule {}
