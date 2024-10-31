import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TABLES } from '@src/common/constants';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';

@Entity({
  name: TABLES.status,
})
export class StatusEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
