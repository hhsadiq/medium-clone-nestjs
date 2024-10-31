import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { Role } from '@src/v2/roles/domain/role';

export class RoleDto implements Role {
  @ApiProperty()
  @IsNumber()
  id: number;
}
