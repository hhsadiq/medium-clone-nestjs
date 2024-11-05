import { ApiProperty } from '@nestjs/swagger';

import { User } from './user';

export class UserFollow {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  follower: User;

  @ApiProperty()
  following: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
