import { Injectable } from '@nestjs/common';

import { NullableType } from '@src/utils/types/nullable.type';

import { FileType } from './domain/file';
import { FileAbstractRepository } from './infrastructure/persistence/file.abstract.repository';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileAbstractRepository) {}

  findById(id: FileType['id']): Promise<NullableType<FileType>> {
    return this.fileRepository.findById(id);
  }
}
