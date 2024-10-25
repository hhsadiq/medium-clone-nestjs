/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: TABLES.follow, // Define the table name for this entity
})
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  follower_id: number;

  @Column({ type: 'int', nullable: false })
  following_id: number;

  @ManyToOne(() => UserEntity, (user) => user.following, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'follower_id' })
  follower: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
