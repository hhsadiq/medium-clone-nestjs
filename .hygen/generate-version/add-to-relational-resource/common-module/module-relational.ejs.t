---
sh: |
  sed -i '/imports: \[/s/\(imports: \[\)/\1Relational<%= name %>PersistenceModule<%= version.toUpperCase() %>, /' "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
---
