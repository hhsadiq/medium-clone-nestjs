import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ClapArticleDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  count: number = 1;
}
