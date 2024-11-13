---
sh: |
  node scripts/versioning/domain.js <%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> <%= version %>
---
