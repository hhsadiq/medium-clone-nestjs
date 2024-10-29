import { ApiProperty } from '@nestjs/swagger';

import { Article } from '@src/articles/domain/article';
import { User } from '@src/users/domain/user';

export class UserFavouriteArticle {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  articleId: string;

  @ApiProperty()
  userId: number | string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  article: Article;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
