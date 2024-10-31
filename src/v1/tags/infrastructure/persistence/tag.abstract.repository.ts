import { NullableType } from '@src/utils/types/nullable.type';
import { Tag } from '@src/v1/tags/domain/tag';

export abstract class TagAbstractRepository {
  abstract createMany(
    data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Tag[]>;

  abstract findAll(): Promise<NullableType<Tag[]>>;

  abstract findByNames(name: Tag['name'][]): Promise<NullableType<Tag[]>>;
}
