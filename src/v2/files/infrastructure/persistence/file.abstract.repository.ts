import { NullableType } from '@src/utils/types/nullable.type';
import { FileType } from '@src/v2/files/domain/file';

export abstract class FileAbstractRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findById(id: FileType['id']): Promise<NullableType<FileType>>;
}
