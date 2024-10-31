import { ApiProperty } from '@nestjs/swagger';

import { FileType } from '@src/v2/files/domain/file';

export class FileResponseDto {
  @ApiProperty({
    type: () => FileType,
  })
  file: FileType;
}
