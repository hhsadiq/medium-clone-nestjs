import { Clap } from '@src/claps/domain/clap';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ClapAbstractRepository {
  abstract create(
    data: Omit<Clap, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'article'>,
  ): Promise<Clap>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Clap[]>;

  abstract findByArticleIdAndUserId(
    articleId: Clap['articleId'],
    userId: Clap['userId'],
  ): Promise<NullableType<Clap>>;

  abstract incrementCounter(
    articleId: Clap['articleId'],
    userId: Clap['userId'],
  ): Promise<NullableType<Clap>>;
}
