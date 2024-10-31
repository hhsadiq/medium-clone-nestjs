import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';
import { ArticleEntity } from '@src/v1/articles/infrastructure/persistence/relational/entities/article.entity';
import { UserEntity } from '@src/v1/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: TABLES.comment,
})
export class CommentEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  article_id: string;

  @Column({ type: 'int' })
  author_id: number;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ type: 'text' })
  body: string;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
