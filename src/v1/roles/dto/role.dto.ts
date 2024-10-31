import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { Role } from '@src/v1/roles/domain/role';

export class RoleDto implements Role {
  @ApiProperty()
  @IsNumber()
  id: number;
}
