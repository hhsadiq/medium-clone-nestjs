---
to: "<%= functionalities.includes('update') ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/dto/update-${h.inflection.transform(name, ['underscore', 'dasherize'])}.dto.${version}.ts` : null %>"
---
// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { Create<%= name %>Dto<%= version.toUpperCase() %> } from './create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.<%= version%>';

export class Update<%= name %>Dto<%= version.toUpperCase() %> extends PartialType(Create<%= name %>Dto<%= version.toUpperCase() %>) {}