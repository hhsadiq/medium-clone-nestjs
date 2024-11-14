---
to: "<%= version === 'v1' ? `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.ts` : `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.${version}.ts` %>"
---
import { <%= entity %><%= name %> } from "<%= version === 'v1' ? `@src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}` : `@src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.${version}` %>";

export class <%= entity %><%= name %>Mapper {
  static <%= name %>ToDomain(raw: any): <%= entity %><%= name %> {
    const domainEntity = new <%= entity %><%= name %>();
    return domainEntity;
  }
}
