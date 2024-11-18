---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository.<%= version%>.ts
---
<% if (functionalities.includes('update')) { %>
import { DeepPartial } from '../../../../utils/types/deep-partial.type';
<% } %>
<% if (functionalities.includes('findOne')) { %>
import { NullableType } from '@src/utils/types/nullable.type';
<% } %>
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
<% } %>
<% if (functionalities.includes('update') || functionalities.includes('create') || functionalities.includes('findOne') || functionalities.includes('findAll') || functionalities.includes('delete')) { %>
import { <%= name %><%= version.toUpperCase() %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>';
<% } %>
export abstract class <%= name %>AbstractRepository<%= version.toUpperCase() %> {
  <% if (functionalities.includes('create')) { %>
  abstract create(
    data: Omit<<%= name %><%= version.toUpperCase() %>, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<<%= name %><%= version.toUpperCase() %>>;
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<<%= name %><%= version.toUpperCase() %>[]>;
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  abstract findById(id: <%= name %><%= version.toUpperCase() %>['id']): Promise<NullableType<<%= name %><%= version.toUpperCase() %>>>;
  <% } %>

  <% if (functionalities.includes('update')) { %>
  abstract update(
    id: <%= name %><%= version.toUpperCase() %>['id'],
    payload: DeepPartial<<%= name %><%= version.toUpperCase() %>>,
  ): Promise<<%= name %><%= version.toUpperCase() %> | null>;
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  abstract remove(id: <%= name %><%= version.toUpperCase() %>['id']): Promise<void>;
  <% } %>
}
