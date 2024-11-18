---
sh: |
  node scripts/versioning/entities.js <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
