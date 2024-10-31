---
to: src/<%= version %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mapper.ts
---
import { <%= name %> } from '../../../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { <%= name %>Entity } from '../entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';

export class <%= name %>Mapper {
  static toDomain(raw: <%= name %>Entity): <%= name %> {
    const domainEntity = new <%= name %>();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: <%= name %>): <%= name %>Entity {
    const persistenceEntity = new <%= name %>Entity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
