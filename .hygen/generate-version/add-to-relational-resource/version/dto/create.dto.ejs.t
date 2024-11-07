---
to: "<%= functionalities.includes('create') ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/dto/create-${h.inflection.transform(name, ['underscore', 'dasherize'])}.${version}.dto.ts` : null %>"
---
export class Create<%= name %>Dto<%= version.toUpperCase() %> {

  // @custom-inject-point
  // Don't forget to use the class-validator decorators in the DTO properties.
}
