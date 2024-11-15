---
to: "<%= version === 'v1' ? `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.ts` : `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.${version}.ts` %>"
---
import { <%= version === 'v1' ? `${entity}${name}` : `${entity}${name}${version.toUpperCase()}` %> } from "<%= version === 'v1' ? `@src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}` : `@src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.${version}` %>";

export class <%= version === 'v1' ? `${entity}${name}Mapper` : `${entity}${name}${version.toUpperCase()}Mapper` %> {
  static <%= name %>ToDomain(raw: any): <%= version === 'v1' ? `${entity}${name}` : `${entity}${name}${version.toUpperCase()}` %> {
    const domainEntity = new <%= version === 'v1' ? `${entity}${name}` : `${entity}${name}${version.toUpperCase()}` %>();
    return domainEntity;
  }
}
