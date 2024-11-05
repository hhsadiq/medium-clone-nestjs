import { Injectable } from '@nestjs/common';

import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

import { Clap } from './domain/clap';
import { ClapAbstractRepository } from './infrastructure/persistence/clap.abstract.repository';

@Injectable()
export class ClapsService {
  constructor(private readonly clapRepository: ClapAbstractRepository) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.clapRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Clap['id']) {
    return this.findAndValidate('id', id);
  }

  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // capitalize first letter of the field name
    if (typeof this.clapRepository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on clap repository.`,
        field,
      );
    }

    const clap = await this.clapRepository[repoFunction](value);
    if (!clap) {
      throw NOT_FOUND('Clap', { [field]: value });
    }
    return clap;
  }
}
