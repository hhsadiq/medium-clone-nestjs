import { ApiProperty } from '@nestjs/swagger';

import { FileType } from '@src/v1/files/domain/file';

export class FileResponseDto {
  @ApiProperty({
    type: () => FileType,
  })
  file: FileType;

  @ApiProperty({
    type: String,
  })
  uploadSignedUrl: string;
}
