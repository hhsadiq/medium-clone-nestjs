---
inject: true
to: "<%= version === 'v1' ? 'src/' + h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) + '/dto/create-' + h.inflection.transform(name, ['underscore', 'dasherize']) + '.dto.ts' : 'src/' + h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) + '/' + version + '/dto/create-' + h.inflection.transform(name, ['underscore', 'dasherize']) + '.dto.' + version + '.ts' %>"
before: export class Create<%= name %>Dto
skip_if: "} from 'class-validator'"
---
<% if (isAddToDto) { -%>
import {
  // decorators here
} from 'class-validator';
<% } -%>