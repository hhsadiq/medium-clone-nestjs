---
to: "<%= functionalities.includes('findAll') ? `src/${version}/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/dto/find-all-${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}.dto.ts` : null %>"
---
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;
}
