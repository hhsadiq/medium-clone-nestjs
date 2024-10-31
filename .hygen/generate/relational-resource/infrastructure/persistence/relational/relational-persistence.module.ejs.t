---
to: src/<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/relational-persistence.module.ts
---
import { Module } from '@nestjs/common';
import { <%= name %>AbstractRepository } from '../<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository';
import { <%= name %>RelationalRepository } from './repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= name %>Entity } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';

@Module({
  imports: [TypeOrmModule.forFeature([<%= name %>Entity])],
  providers: [
    {
      provide: <%= name %>AbstractRepository,
      useClass: <%= name %>RelationalRepository,
    },
  ],
  exports: [<%= name %>AbstractRepository],
})
export class Relational<%= name %>PersistenceModule {}
