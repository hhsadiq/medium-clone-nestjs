import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TransactionManagerPort } from './transaction-manager.port';

@Injectable()
export class TypeORMTransactionManager implements TransactionManagerPort {
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    work: (transactionalEntityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(work);
  }
}
