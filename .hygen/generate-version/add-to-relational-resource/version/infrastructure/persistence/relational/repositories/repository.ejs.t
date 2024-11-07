---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/infrastructure/persistence/relational/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.repository.ts
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { <%= name %>Entity<%= version.toUpperCase() %> } from '../entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.entity';
<% if (functionalities.includes('findOne')) { %>
import { NullableType } from '@src/utils/types/nullable.type';
<% } %>
<% if (functionalities.includes('update') || functionalities.includes('create') || functionalities.includes('findOne') || functionalities.includes('findAll') || functionalities.includes('delete')) { %>
import { <%= name %><%= version.toUpperCase() %> } from '../../../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>';
<% } %>
import { <%= name %>AbstractRepository<%= version.toUpperCase() %> } from '../../<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.<%= version%>.repository';
<% if (functionalities.includes('create') || functionalities.includes('findAll') || functionalities.includes('findOne') || functionalities.includes('update')) { %>
import { <%= name %>Mapper<%= version.toUpperCase() %> } from '../mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>.mapper';
<% } %>
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
<% } %>
@Injectable()
export class <%= name %>RelationalRepository<%= version.toUpperCase() %> implements <%= name %>AbstractRepository<%= version.toUpperCase() %> {
  constructor(
    @InjectRepository(<%= name %>Entity<%= version.toUpperCase() %>)
    private readonly <%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>: Repository<<%= name %>Entity<%= version.toUpperCase() %>>,
  ) {}

  <% if (functionalities.includes('create')) { %>
  async create(data: <%= name %><%= version.toUpperCase() %>): Promise<<%= name %><%= version.toUpperCase() %>> {
    const persistenceModel = <%= name %>Mapper<%= version.toUpperCase() %>.toPersistence(data);
    const newEntity = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.save(
      this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.create(persistenceModel),
    );
    return <%= name %>Mapper<%= version.toUpperCase() %>.toDomain(newEntity);
  }
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<<%= name %><%= version.toUpperCase() %>[]> {
    const entities = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => <%= name %>Mapper<%= version.toUpperCase() %>.toDomain(entity));
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  async findById(id: <%= name %><%= version.toUpperCase() %>['id']): Promise<NullableType<<%= name %><%= version.toUpperCase() %>>> {
    const entity = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.findOne({
      where: { id },
    });

    return entity ? <%= name %>Mapper<%= version.toUpperCase() %>.toDomain(entity) : null;
  }
  <% } %>

  <% if (functionalities.includes('update')) { %>
  async update(
    id: <%= name %><%= version.toUpperCase() %>['id'],
    payload: Partial<<%= name %><%= version.toUpperCase() %>>,
  ): Promise<<%= name %><%= version.toUpperCase() %> | null> {
    const entity = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.findOne({
      where: { id },
    });

    if (!entity) return null;

    const updatedEntity = await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.save(
      this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.create(
        <%= name %>Mapper<%= version.toUpperCase() %>.toPersistence({
          ...<%= name %>Mapper<%= version.toUpperCase() %>.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return <%= name %>Mapper<%= version.toUpperCase() %>.toDomain(updatedEntity);
  }
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  async remove(id: <%= name %><%= version.toUpperCase() %>['id']): Promise<void> {
    await this.<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.delete(id);
  }
  <% } %>
}
