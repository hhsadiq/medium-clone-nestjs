import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
const idType = Number;

export class UserSummary {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @ApiProperty({
    type: String,
    example: 'User',
  })
  roleName: string | null;

  @ApiProperty({
    type: String,
    example: 'Active',
  })
  statusName: string | null;

  @ApiProperty({
    type: String,
    example: 'www.s3.com/image-path',
  })
  photoUrl: string | null;
}
