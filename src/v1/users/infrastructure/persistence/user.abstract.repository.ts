import { SelectQueryBuilder } from 'typeorm';

import { DeepPartial } from '@src/utils/types/deep-partial.type';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';
import { User } from '@src/v1/users/domain/user';
import { FilterUserDto, SortUserDto } from '@src/v1/users/dto/query-user.dto';
import { UserSummary } from '@src/v1/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/v1/views/infrastructure/persistence/relational/entities/user-summary-view.entity';

export abstract class UserAbstractRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;

  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

  abstract findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>>;

  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(id: User['id']): Promise<void>;
  abstract getUserSummary(
    id: User['id'],
    query: SelectQueryBuilder<UserSummaryViewEntity>,
  ): Promise<NullableType<UserSummary>>;
}
