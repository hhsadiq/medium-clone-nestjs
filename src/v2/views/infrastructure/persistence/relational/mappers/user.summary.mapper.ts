import { UserSummary } from '@src/v2/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/v2/views/infrastructure/persistence/relational/entities/user-summary-view.entity';

export class UserSummaryMapper {
  static toDomain(raw: UserSummaryViewEntity): UserSummary {
    const domainEntity = new UserSummary();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.firstName = raw.first_name;
    domainEntity.lastName = raw.last_name;
    domainEntity.roleName = raw.role_name;
    domainEntity.statusName = raw.status_name;
    domainEntity.photoUrl = raw.photo_url;
    return domainEntity;
  }
}
