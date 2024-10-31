import { Injectable } from '@nestjs/common';

import { QueryBuilder } from '@src/database/utils/query-builder';
import { UserSummary } from '@src/v2/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/v2/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { ViewsAbstractRepository } from '@src/v2/views/infrastructure/persistence/view.abstract.repository';

@Injectable()
export class ViewsService {
  constructor(private readonly viewsRepository: ViewsAbstractRepository) {}

  getUsersSummaryView(): QueryBuilder<UserSummaryViewEntity> {
    return this.viewsRepository.getUsersSummaryView();
  }

  getUsersSummary(): Promise<UserSummary[]> {
    return this.viewsRepository.getUsersSummary();
  }
}
