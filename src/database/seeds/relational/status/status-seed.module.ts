import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusEntity } from '@src/v2/statuses/infrastructure/persistence/relational/entities/status.entity';

import { StatusSeedService } from './status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  providers: [StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
