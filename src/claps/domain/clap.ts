import { ApiProperty } from '@nestjs/swagger';

import { Article } from '@src/articles/domain/article';
import { User } from '@src/users/domain/user';

export class Clap {
  @ApiProperty()
  id: string;

  @ApiProperty()
  articleId: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  counter: number;

  @ApiProperty()
  article: Article;

  @ApiProperty()
  user: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
