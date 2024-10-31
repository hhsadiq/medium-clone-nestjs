import { Injectable } from '@nestjs/common';

import { TransactionManagerPort } from './transaction-manager/transaction-manager.port';

@Injectable()
export class DatabaseHelperRepository {
  constructor(public readonly transactionManager: TransactionManagerPort) {}
}
