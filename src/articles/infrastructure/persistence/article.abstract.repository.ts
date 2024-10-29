import { ArticleDTOWithTagDomains } from '@src/articles/articles.types';
import { Article } from '@src/articles/domain/article';
import { DeepPartial } from '@src/utils/types/deep-partial.type';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ArticleAbstractRepository {
  abstract create(data: ArticleDTOWithTagDomains): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]>;

  abstract findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Article[], number]>;

  abstract findById(id: Article['id']): Promise<NullableType<Article>>;

  abstract findByIdWithRelations(
    id: Article['id'],
  ): Promise<NullableType<Article>>;

  abstract findBySlug(id: Article['slug']): Promise<NullableType<Article>>;

  abstract update(
    entity: Article,
    payload: DeepPartial<
      Omit<
        Article,
        'id' | 'tagList' | 'comments' | 'author' | 'createdAt' | 'updatedAt'
      >
    >,
  ): Promise<Article>;

  abstract remove(id: Article['id']): Promise<void>;

  abstract findAllWithArticleIdsPagination({
    paginationOptions,
    articleIds,
  }: {
    paginationOptions: IPaginationOptions;
    articleIds: string[];
  }): Promise<Article[]>;
}
