---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/infrastructure/persistence/relational/relational-persistence.<%= version%>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= name %>AbstractRepository<%= version.toUpperCase() %> } from '../<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.<%= version%>.repository';
import { <%= name %>RelationalRepository<%= version.toUpperCase() %> } from './repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= name %>Entity<%= version.toUpperCase() %> } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.entity';

@Module({
  imports: [TypeOrmModule.forFeature([<%= name %>Entity<%= version.toUpperCase() %>])],
  providers: [
    {
      provide: <%= name %>AbstractRepository<%= version.toUpperCase() %>,
      useClass: <%= name %>RelationalRepository<%= version.toUpperCase() %>,
    },
  ],
  exports: [<%= name %>AbstractRepository<%= version.toUpperCase() %>],
})
export class Relational<%= name %>PersistenceModule<%= version.toUpperCase() %> {}
