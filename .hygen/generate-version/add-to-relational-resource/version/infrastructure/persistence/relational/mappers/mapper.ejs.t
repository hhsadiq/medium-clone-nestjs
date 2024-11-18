---
sh: |
  node scripts/versioning/mappers.js <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
