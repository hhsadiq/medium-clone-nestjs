---
to: "<%= isAddTestCase ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}.service.spec.${version}.ts` : null %>"
---
import { Test, TestingModule } from '@nestjs/testing';
<% if (functionalities.includes('update') || functionalities.includes('create') || functionalities.includes('findOne') || functionalities.includes('findAll')) { %>
import {
  <% if (functionalities.includes('findAll')) { %> 
  paginationOptions,
  <% } %>
  <% if (functionalities.includes('update') || functionalities.includes('findOne')) { %>
  mock<%= name %><%= version.toUpperCase() %>,
  <% } %>
  <% if (functionalities.includes('create')) { %>
  mockCreate<%= name %>Dto<%= version.toUpperCase() %>,
  <% } %>
  <% if (functionalities.includes('update')) { %>
  mockUpdate<%= name %>Dto<%= version.toUpperCase() %>,
  <% } %>
} from './__mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.<%= version %>';
<% } %>
import { <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %> } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.<%= version %>';
import { <%= name %>AbstractRepository<%= version.toUpperCase() %> } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository.<%= version %>';

describe('<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>', () => {
  let service: <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>;
  let <%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>: <%= name %>AbstractRepository<%= version.toUpperCase() %>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>,
        {
          provide: <%= name %>AbstractRepository<%= version.toUpperCase() %>,
          useValue: {
            <% if (functionalities.includes('create')) { %>
            create: jest.fn(),
            <% } %>
            <% if (functionalities.includes('findAll')) { %>
            findAllWithPagination: jest.fn(),
            <% } %>
            <% if (functionalities.includes('findOne')) { %>
            findById: jest.fn(),
            <% } %>
            <% if (functionalities.includes('update')) { %>
            update: jest.fn(),
            <% } %>
            <% if (functionalities.includes('delete')) { %>
            remove: jest.fn(),
            <% } %>
          },
        },
      ],
    }).compile();

    service = module.get<<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>>(<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>);
    <%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %> = module.get<<%= name %>AbstractRepository<%= version.toUpperCase() %>>(<%= name %>AbstractRepository<%= version.toUpperCase() %>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  <% if (functionalities.includes('create')) { %>
  it('should create a <%= name.toLowerCase() %>', async () => {
    await service.create(mockCreate<%= name %>Dto<%= version.toUpperCase() %>);
    expect(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.create).toHaveBeenCalledWith(mockCreate<%= name %>Dto<%= version.toUpperCase() %>);
  });
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  it('should find all <%= h.inflection.pluralize(name.toLowerCase()) %> with pagination', async () => {
    await service.findAllWithPagination({ paginationOptions });
    expect(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.findAllWithPagination).toHaveBeenCalledWith({
      paginationOptions,
    });
  });
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  it('should return a <%= name.toLowerCase() %> when found by id', async () => {
    const id = mock<%= name %><%= version.toUpperCase() %>.id;
    jest.spyOn(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>, 'findById').mockResolvedValue(mock<%= name %><%= version.toUpperCase() %>);
    const result = await service.findOne(id);

    expect(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mock<%= name %><%= version.toUpperCase() %>);
  });
  <% } %>

  <% if (functionalities.includes('update')) { %>
  it('should update a <%= name.toLowerCase() %> by ID', async () => {
    const id = mock<%= name %><%= version.toUpperCase() %>.id;
    jest.spyOn(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>, 'update').mockResolvedValue(mock<%= name %><%= version.toUpperCase() %>);
    await service.update(id, mockUpdate<%= name %>Dto<%= version.toUpperCase() %>);
    expect(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.update).toHaveBeenCalledWith(id, mockUpdate<%= name %>Dto<%= version.toUpperCase() %>);
  });
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  it('should remove a <%= name.toLowerCase() %> by ID', async () => {
    const id = 'testId';
    await service.remove(id);
    expect(<%= h.inflection.camelize(name, true) %>Repository<%= version.toUpperCase() %>.remove).toHaveBeenCalledWith(id);
  });
  <% } %>
});
