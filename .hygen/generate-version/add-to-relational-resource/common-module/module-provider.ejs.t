---
sh: |
  sed -i '/providers: \[/s/\(providers: \[\)/\1<%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %>, /' "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts"
---
