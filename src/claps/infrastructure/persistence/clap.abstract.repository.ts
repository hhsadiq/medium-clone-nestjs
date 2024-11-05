import { Clap } from '@src/claps/domain/clap';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ClapAbstractRepository {
  abstract create(
    data: Omit<Clap, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Clap>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Clap[]>;
}
