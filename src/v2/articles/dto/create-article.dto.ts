import {
  // decorators here
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { Tag } from '@src/v2/tags/domain/tag';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagList?: Tag['name'][];

  // Don't forget to use the class-validator decorators in the DTO properties.
}
