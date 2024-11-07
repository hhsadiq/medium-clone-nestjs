---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version%>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.<%= version%>.controller.ts
---
import {
  Controller,
  <% if (functionalities.includes('findAll') || functionalities.includes('findOne')) { %>
  Get,
  <% } %>
  <% if (functionalities.includes('create')) { %>
  Post,
  <% } %>
  <% if (functionalities.includes('update') || functionalities.includes('create')) { %>
  Body,
  <% } %>
  <% if (functionalities.includes('update')) { %>
  Patch,
  <% } %>
  <% if (functionalities.includes('findOne') || functionalities.includes('update') || functionalities.includes('delete')) { %>
  Param,
  <% } %>
  <% if (functionalities.includes('delete')) { %>
  Delete,
  <% } %>
  UseGuards,
  <% if (functionalities.includes('findAll')) { %>
  Query,
  <% } %>
} from '@nestjs/common';
import {
  ApiBearerAuth,
  <% if (functionalities.includes('create')) { %>
  ApiCreatedResponse,
  <% } %>
  <% if (functionalities.includes('findAll') || functionalities.includes('update')) { %>
  ApiOkResponse,
  <% } %>
  <% if (functionalities.includes('findOne') || functionalities.includes('update') || functionalities.includes('delete')) { %>
  ApiParam,
  <% } %>
  ApiTags,
} from '@nestjs/swagger';
import { <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %> } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.<%= version%>.service';
<% if (functionalities.includes('create')) { %>
import { Create<%= name %>Dto<%= version.toUpperCase() %> } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.dto';
<% } %>
<% if (functionalities.includes('update')) { %>
import { Update<%= name %>Dto<%= version.toUpperCase() %> } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.dto';
<% } %>
<% if (functionalities.includes('create') || functionalities.includes('update') || functionalities.includes('findAll')) { %>
import { <%= name %><%= version.toUpperCase() %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>';
<% } %>
import { AuthGuard } from '@nestjs/passport';
<% if (functionalities.includes('findAll')) { %>
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto<%= version.toUpperCase() %> } from './dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.<%= version%>.dto';
<% } %>

@ApiTags('<%= h.inflection.transform(name, ['pluralize', 'humanize']) %><%= version.toUpperCase() %>')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: '<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version.toUpperCase() %>',
  version: '<%= version.replace('v', '') %>',
})
export class <%= h.inflection.transform(name, ['pluralize']) %>Controller<%= version.toUpperCase() %> {
  constructor(private readonly <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>: <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>) {}

  <% if (functionalities.includes('create')) { %>
  @Post()
  @ApiCreatedResponse({
    type: <%= name %><%= version.toUpperCase() %>,
  })
  create(@Body() create<%= name %>Dto<%= version.toUpperCase() %>: Create<%= name %>Dto<%= version.toUpperCase() %>) {
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>.create(create<%= name %>Dto<%= version.toUpperCase() %>);
  }
  <% } %>

  <% if (functionalities.includes('findAll')) { %>
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(<%= name %><%= version.toUpperCase() %>),
  })
  async findAll(
    @Query() query: FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto<%= version.toUpperCase() %>,
  ): Promise<InfinityPaginationResponseDto<<%= name %><%= version.toUpperCase() %>>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
  <% } %>

  <% if (functionalities.includes('findOne')) { %>
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: <%= name %><%= version.toUpperCase() %>,
  })
  findOne(@Param('id') id: string) {
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>.findOne(id);
  }
  <% } %>

  <% if (functionalities.includes('update')) { %>
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: <%= name %><%= version.toUpperCase() %>,
  })
  update(
    @Param('id') id: string,
    @Body() update<%= name %>Dto<%= version.toUpperCase() %>: Update<%= name %>Dto<%= version.toUpperCase() %>,
  ) {
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>.update(id, update<%= name %>Dto<%= version.toUpperCase() %>);
  }
  <% } %>

  <% if (functionalities.includes('delete')) { %>
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service<%= version.toUpperCase() %>.remove(id);
  }
  <% } %>
}
