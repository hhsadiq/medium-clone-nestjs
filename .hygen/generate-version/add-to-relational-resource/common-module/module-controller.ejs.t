---
sh: |
  sed -i '/controllers: \[/s/\(controllers: \[\)/\1<%= h.inflection.transform(name, ['pluralize']) %>Controller<%= version.toUpperCase() %>, /' "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
---