---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts
after: import;
---

import { <%= h.inflection.transform(name, ['pluralize']) %>Service<%= version.toUpperCase() %> } from './<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.<%= version %>.service';
import { <%= h.inflection.transform(name, ['pluralize']) %>Controller<%= version.toUpperCase() %> } from './<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.<%= version %>.controller';
import { Relational<%= name %>PersistenceModule<%= version.toUpperCase() %> } from './<%= version %>/infrastructure/persistence/relational/relational-persistence.<%= version %>.module';
