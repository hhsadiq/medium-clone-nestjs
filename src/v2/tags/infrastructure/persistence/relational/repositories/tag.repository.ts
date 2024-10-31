import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { NullableType } from '@src/utils/types/nullable.type';
import { Tag } from '@src/v2/tags/domain/tag';
import { TagEntity } from '@src/v2/tags/infrastructure/persistence/relational/entities/tag.entity';
import { TagMapper } from '@src/v2/tags/infrastructure/persistence/relational/mappers/tag.mapper';
import { TagAbstractRepository } from '@src/v2/tags/infrastructure/persistence/tag.abstract.repository';

@Injectable()
export class TagRelationalRepository implements TagAbstractRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createMany(data: Tag[]): Promise<Tag[]> {
    const persistenceModel = data.map((tag) => TagMapper.toPersistence(tag));

    const newEntity = await this.tagRepository.save(
      this.tagRepository.create(persistenceModel),
    );

    return newEntity.map((entity) => TagMapper.toDomain(entity));
  }

  async findAll(): Promise<Tag[]> {
    const entities = await this.tagRepository.find();

    return entities.map((entity) => TagMapper.toDomain(entity));
  }

  async findByNames(names: Tag['name'][]): Promise<NullableType<Tag[]>> {
    const entities = await this.tagRepository.find({
      where: {
        name: In(names),
      },
    });

    return entities.map((entity) => TagMapper.toDomain(entity));
  }
}
