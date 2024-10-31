import { Tag } from '@src/v1/tags/domain/tag';

import { Article } from './domain/article';

export type ArticleWithTagDomains = Omit<Article, 'tagList'> & {
  tagList?: Tag[] | null;
};

export type ArticleDTOWithTagDomains = Omit<
  ArticleWithTagDomains,
  'id' | 'comments' | 'author' | 'createdAt' | 'updatedAt'
>;
