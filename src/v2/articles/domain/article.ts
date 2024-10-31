import { ApiProperty } from '@nestjs/swagger';

import { NullableType } from '@src/utils/types/nullable.type';
import { Comment } from '@src/v2/comments/domain/comment';
import { Tag } from '@src/v2/tags/domain/tag';
import { User } from '@src/v2/users/domain/user';

export class Article {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty({
    type: Number,
  })
  authorId: number | string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  comments: Comment[];

  @ApiProperty({
    type: [String],
  })
  tagList?: NullableType<Tag['name'][]>;

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
