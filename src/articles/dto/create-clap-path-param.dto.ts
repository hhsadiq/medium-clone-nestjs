import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClapPathParamDto {
  @ApiProperty()
  @IsString()
  slug: string;
}
