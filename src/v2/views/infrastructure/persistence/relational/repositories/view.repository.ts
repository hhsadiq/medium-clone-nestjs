import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { UserSummary } from '@src/v2/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/v2/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { UserSummaryMapper } from '@src/v2/views/infrastructure/persistence/relational/mappers/user.summary.mapper';
import { ViewsAbstractRepository } from '@src/v2/views/infrastructure/persistence/view.abstract.repository';
import { USER_SUMMARY_VIEW } from '@src/v2/views/infrastructure/persistence/view.consts';

@Injectable()
export class ViewsRelationalRepository implements ViewsAbstractRepository {
  constructor(
    @InjectRepository(UserSummaryViewEntity)
    private readonly userSummaryRepository: Repository<UserSummaryViewEntity>,
  ) {}

  getUsersSummaryView(): SelectQueryBuilder<UserSummaryViewEntity> {
    return this.userSummaryRepository.createQueryBuilder(
      USER_SUMMARY_VIEW.name,
    );
  }

  async getUsersSummary(): Promise<UserSummary[]> {
    const users = await this.userSummaryRepository.find();
    return users.map((user) => UserSummaryMapper.toDomain(user));
  }
}
