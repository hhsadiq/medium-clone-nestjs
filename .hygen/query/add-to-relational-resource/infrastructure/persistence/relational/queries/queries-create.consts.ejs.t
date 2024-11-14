---
to: "<%= version === 'v1' ? `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-queries.const.ts` : `src/${h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize'])}/${version}/infrastructure/persistence/relational/queries/${h.inflection.transform(entity, ['underscore', 'dasherize'])}-queries.const.${version}.ts` %>"
unless_exists: true
---

// Add Query Here
