import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: TABLES.user_favorite_article, // Define the table name for this entity
})
export class UserFavouriteArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  article_id: string;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => ArticleEntity, (article) => article.favourites, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.favouriteArticles, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
