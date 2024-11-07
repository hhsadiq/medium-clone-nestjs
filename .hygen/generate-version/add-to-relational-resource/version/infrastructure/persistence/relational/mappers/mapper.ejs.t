---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/infrastructure/persistence/relational/mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.mapper.ts
---
import { <%= name %><%= version.toUpperCase() %> } from '../../../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version %>';
import { <%= name %>Entity<%= version.toUpperCase() %> } from '../entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.<%= version%>.entity';

export class <%= name %>Mapper<%= version.toUpperCase() %> {
  static toDomain(raw: <%= name %>Entity<%= version.toUpperCase() %>): <%= name %><%= version.toUpperCase() %> {
    const domainEntity = new <%= name %><%= version.toUpperCase() %>();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;
  
    return domainEntity;
  }

  static toPersistence(domainEntity: <%= name %><%= version.toUpperCase() %>): <%= name %>Entity<%= version.toUpperCase() %> {
    const persistenceEntity = new <%= name %>Entity<%= version.toUpperCase() %>();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
