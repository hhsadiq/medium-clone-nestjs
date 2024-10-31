---
inject: true
to: src/<%= version %>/app.module.ts
after: imports
---
    <%= h.inflection.transform(name, ['pluralize']) %>Module,