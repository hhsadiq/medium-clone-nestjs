import { ApiProperty } from '@nestjs/swagger';

import { User } from '@src/v1/users/domain/user';

export class LoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  token_expires: number;

  @ApiProperty({
    type: () => User,
  })
  user: User;
}
