import { ApiProperty } from '@nestjs/swagger';

import { Article } from '@src/articles/domain/article';
import { User } from '@src/users/domain/user';

export class Clap {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  counter: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: User['id'];

  @ApiProperty()
  user: User;

  @ApiProperty({
    type: String,
    example: 'cfcfd096-85dd-4856-923e-48653359a476',
  })
  articleId: string;

  @ApiProperty()
  article: Article;

  // @custom-inject-point
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
