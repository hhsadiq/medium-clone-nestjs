import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';
import { NullableType } from '@src/utils/types/nullable.type';
import { CommentEntity } from '@src/v2/comments/infrastructure/persistence/relational/entities/comment.entity';
import { TagEntity } from '@src/v2/tags/infrastructure/persistence/relational/entities/tag.entity';
import { UserEntity } from '@src/v2/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: TABLES.article,
})
export class ArticleEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'int' })
  author_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'article_tag',
    joinColumn: {
      name: 'article_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  tagList?: NullableType<TagEntity[]>;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
