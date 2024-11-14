---
inject: true
to: "<%= version === 'v1' ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/infrastructure/persistence/relational/mappers/${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.ts` : `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/infrastructure/persistence/relational/mappers/${h.inflection.transform(name, ['underscore', 'dasherize'])}.mapper.${version}.ts` %>"
after: new <%= name %>\(\)
---

<% if (isOptional) { -%>
if (raw.<%= property %>) {
<% } -%>
domainEntity.<%= h.inflection.camelize(property, true) %> = raw.<%= property %>;
<% if (isOptional) { -%>
}
<% } -%>
