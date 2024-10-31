---
inject: true
to: src/<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
before: "} from 'class-validator'"
skip_if: \IsBoolean,
---
<% if (isAddToDto && h.getType(type) === 'boolean') { -%>
IsBoolean,
<% } -%>