---
inject: true
to: "<%= version === 'v1' ? `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-queries.const.ts` : `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-queries.const.${version}.ts` %>"
after: // Add Query Here
---

export const <%= h.inflection.transform(entity, ['underscore']).toUpperCase() %>_<%= h.inflection.transform(name, ['underscore']).toUpperCase() %> = ``;