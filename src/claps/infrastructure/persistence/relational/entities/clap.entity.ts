import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';

@Entity({
  name: TABLES.clap,
})
export class ClapEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  user_id: UserEntity['id'];

  @ManyToOne(() => UserEntity, (user) => user.claps)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @PrimaryColumn({
    type: 'uuid',
  })
  article_id: string;

  @ManyToOne(() => ArticleEntity, (article) => article.claps)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @Column({
    type: 'int',
    default: 0,
  })
  counter: number;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
