---
to: "<%= isAddTestCase ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/__mock__/${h.inflection.transform(name, ['underscore', 'dasherize'])}.${version}.mock.ts` : null %>"
---
<% if (functionalities.includes('findAll')) { %>
import { IPaginationOptions } from "@src/utils/types/pagination-options";
<% } %>
<% if (functionalities.includes('create')) { %>
import { Create<%= name %>Dto<%= version.toUpperCase() %> } from '@src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>.dto';
<% } %>
<% if (functionalities.includes('update')) { %>
import { Update<%= name %>Dto<%= version.toUpperCase() %> } from '@src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>.dto';
<% } %>
import { <%= name %><%= version.toUpperCase() %> } from '@src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>';
// __mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.ts
<% if (functionalities.includes('findAll')) { %>
export const paginationOptions: IPaginationOptions = {
    page: 1,
    limit: 10,
};
<% } %>
<% if (functionalities.includes('create')) { %>
export const mockCreate<%= name %>Dto<%= version.toUpperCase() %>: Create<%= name %>Dto<%= version.toUpperCase() %> = {
    // provide necessary fields here @create-dto
};
<% } %>
<% if (functionalities.includes('update')) { %>
export const mockUpdate<%= name %>Dto<%= version.toUpperCase() %>: Update<%= name %>Dto<%= version.toUpperCase() %> = {
    // provide necessary fields here @update-dto
};
<% } %>
export const mock<%= name %><%= version.toUpperCase() %>: <%= name %><%= version.toUpperCase() %> = {
    id: '<%= Math.floor(Math.random() * 100) %>',
    createdAt: new Date('<%= new Date().toISOString() %>'),
    updatedAt: new Date('<%= new Date().toISOString() %>'),
    // provide necessary fields here @mock-obj
};