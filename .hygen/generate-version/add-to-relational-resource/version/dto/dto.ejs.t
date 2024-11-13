---
sh: |
  node scripts/versioning/dto.js <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
