/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

import { FileType } from '@src/files/domain/file';

export class Profile {
  @ApiProperty()
  username: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty()
  following: boolean;
}
