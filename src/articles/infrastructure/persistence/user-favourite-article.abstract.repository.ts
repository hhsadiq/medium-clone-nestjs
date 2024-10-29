import { Article } from '@src/articles/domain/article';
import { UserFavouriteArticle } from '@src/articles/domain/user-favourite-article';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class UserFavouriteArticleAbstractRepository {
  abstract create(
    data: Omit<
      UserFavouriteArticle,
      'id' | 'user' | 'userId' | 'article' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<UserFavouriteArticle>;

  abstract findByUserIdArticleId(
    userId: User['id'],
    articleId: Article['id'],
  ): Promise<NullableType<UserFavouriteArticle>>;

  abstract findByUserIds(userIds: number[]): Promise<UserFavouriteArticle[]>;

  abstract countFavouritesByArticleId(
    articleId: Article['id'],
  ): Promise<number>;

  abstract remove(id: UserFavouriteArticle['id']): Promise<void>;
}
