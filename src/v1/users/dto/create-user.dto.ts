import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
} from 'class-validator';

import { lowerCaseTransformer } from '@src/utils/transformers/lower-case.transformer';
import { FileDto } from '@src/v1/files/dto/file.dto';
import { RoleDto } from '@src/v1/roles/dto/role.dto';
import { StatusDto } from '@src/v1/statuses/dto/status.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  hehe?: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  hash?: string | null;
}
