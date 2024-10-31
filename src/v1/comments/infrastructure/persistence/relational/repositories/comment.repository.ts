import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';
import { Comment } from '@src/v1/comments/domain/comment';
import { CommentAbstractRepository } from '@src/v1/comments/infrastructure/persistence/comment.abstract.repository';
import { CommentEntity } from '@src/v1/comments/infrastructure/persistence/relational/entities/comment.entity';
import { CommentMapper } from '@src/v1/comments/infrastructure/persistence/relational/mappers/comment.mapper';

@Injectable()
export class CommentRelationalRepository implements CommentAbstractRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    const persistenceModel = CommentMapper.toPersistence(data);
    const newEntity = await this.commentRepository.save(
      this.commentRepository.create(persistenceModel),
    );
    return CommentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    articleId,
  }: {
    paginationOptions: IPaginationOptions;
    articleId: Comment['articleId'];
  }): Promise<Comment[]> {
    const entities = await this.commentRepository.find({
      where: { article_id: articleId },
      relations: {
        author: true,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommentMapper.toDomain(entity));
  }

  async remove(id: Comment['id']): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async findById(id: Comment['id']): Promise<NullableType<Comment>> {
    const entity = await this.commentRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });

    return entity ? CommentMapper.toDomain(entity) : null;
  }
}
