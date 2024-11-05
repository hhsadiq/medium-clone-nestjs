import { ApiProperty } from '@nestjs/swagger';

export class Clap {
  @ApiProperty({
    type: String,
  })
  id: string;

  // @custom-inject-point
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
