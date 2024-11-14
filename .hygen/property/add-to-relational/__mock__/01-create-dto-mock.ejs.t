---
inject: true
to: "<%= version === 'v1' ? `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/__mock__/${h.inflection.transform(name, ['underscore', 'dasherize'])}.mock.ts` : `src/${h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize'])}/${version}/__mock__/${h.inflection.transform(name, ['underscore', 'dasherize'])}.mock.${version}.ts` %>"
before: "// provide necessary fields here @create-dto"
---
<% if (isAddToDto) { -%>
  <% if (h.getType(type) === 'string') { -%>
  <%= h.inflection.camelize(property, true) %>: '<%= h.inflection.humanize(property, true) %> mock data',
  <% } else if (h.getType(type) === 'number') { -%>
  <%= h.inflection.camelize(property, true) %>: <%= Math.floor(Math.random() * 100) %>,
  <% } else if (h.getType(type) === 'boolean') { -%>
  <%= h.inflection.camelize(property, true) %>: <%= Math.random() > 0.5 %>,
  <% } else if (h.getType(type) === 'Date') { -%>
  <%= h.inflection.camelize(property, true) %>: new Date('<%= new Date().toISOString() %>'),
  <% } else if (h.getType(type) === 'object') { -%>
  <%= h.inflection.camelize(property, true) %>: {},
  <% } -%>
<% } -%>
