import { EntityManager } from 'typeorm';

export abstract class TransactionManagerPort {
  abstract runInTransaction<T>(
    work: (transactionalEntityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
