import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { FileResponseDto } from './dto/file-response.dto';
import { FileUploadDto } from './dto/file.dto';
import { FilesS3PresignedService } from './files.service';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesS3PresignedController {
  constructor(private readonly filesService: FilesS3PresignedService) {}

  @ApiCreatedResponse({
    type: FileResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  async uploadFile(@Body() file: FileUploadDto) {
    return this.filesService.create(file);
  }
}
