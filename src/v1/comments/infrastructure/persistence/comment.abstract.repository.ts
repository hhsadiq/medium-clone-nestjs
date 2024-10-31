import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';
import { Comment } from '@src/v1/comments/domain/comment';

export abstract class CommentAbstractRepository {
  abstract create(
    data: Omit<
      Comment,
      'id' | 'author' | 'authorId' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<Comment>;

  abstract findAllWithPagination({
    paginationOptions,
    articleId,
  }: {
    paginationOptions: IPaginationOptions;
    articleId: Comment['articleId'];
  }): Promise<Comment[]>;

  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;

  abstract remove(id: Comment['id']): Promise<void>;
}
