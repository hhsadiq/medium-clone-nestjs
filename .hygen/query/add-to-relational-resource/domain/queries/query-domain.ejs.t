---
to: "<%= version === 'v1' ? `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.ts` : `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/domain/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-${h.inflection.transform(name, ['underscore', 'dasherize'])}.${version}.ts` %>"
---

export class <%= version === 'v1' ? `${entity}${name}` : `${entity}${name}${version.toUpperCase()}` %> {

}
