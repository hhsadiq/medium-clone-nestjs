import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  token_expires: number;
}
