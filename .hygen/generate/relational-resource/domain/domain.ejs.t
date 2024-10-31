---
to: src/<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
import { ApiProperty } from '@nestjs/swagger';

export class <%= name %> {
  @ApiProperty({
    type: String,
  })
  id: string;

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
