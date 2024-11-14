---
inject: true
to: "<%= version === 'v1' ? 'src/' + h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) + '/dto/create-' + h.inflection.transform(name, ['underscore', 'dasherize']) + '.dto.ts' : 'src/' + h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) + '/' + version + '/dto/create-' + h.inflection.transform(name, ['underscore', 'dasherize']) + '.dto.' + version + '.ts' %>"
after: "export class"
---

<% if (isAddToDto) { -%>
  @ApiProperty({
    type: <%= h.getPropertyType(type) %>,
    example: "<%= example %>",
  })
  <% if (h.getType(type) === 'string') { -%>
  @IsString()
  <% } else if (h.getType(type) === 'number') { -%>
  @IsNumber()
  <% } else if (h.getType(type) === 'boolean') { -%>
  @IsBoolean()
  <% } else if (h.getType(type) === 'Date') { -%>
  @IsDate()
  <% } else if (h.getType(type) === 'object') { -%>
  @IsObject()
  <% } -%>
  <% if (isOptional) { -%>
  @IsOptional()
  <% } -%>
  <%= h.inflection.camelize(property, true) %><% if (isOptional) { -%>?<% } -%>: <%= h.getType(type) %>;
<% } -%>
