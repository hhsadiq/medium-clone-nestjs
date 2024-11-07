---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.entity.ts
---

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';
import { TABLES } from '@src/common/constants';

@Entity({
  name: TABLES.<%= h.inflection.camelize(name, true) %>,
})
export class <%= name %>Entity<%= version.toUpperCase() %> extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @custom-inject-point
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
