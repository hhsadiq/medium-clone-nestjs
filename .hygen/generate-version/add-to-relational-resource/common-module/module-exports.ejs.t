---
sh: |
  sed -i '/exports: \[/s/\(exports: \[\)/\1<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>, Relational<%= name %>PersistenceModule<%= version.toUpperCase() %>, /' "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
---
