import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';
import { UserEntity } from '@src/v2/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: TABLES.session,
})
export class SessionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
