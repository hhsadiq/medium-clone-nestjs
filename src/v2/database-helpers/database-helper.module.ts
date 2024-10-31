import { Module } from '@nestjs/common';

import { DatabaseHelperRepository } from './database-helper';
import { TransactionManagerPort } from './transaction-manager/transaction-manager.port';
import { TypeORMTransactionManager } from './transaction-manager/typeorm-transaction-manager';

@Module({
  providers: [
    {
      provide: TransactionManagerPort,
      useClass: TypeORMTransactionManager,
    },
    DatabaseHelperRepository,
  ],
  exports: [DatabaseHelperRepository],
})
export class DatabaseHelperModule {}
