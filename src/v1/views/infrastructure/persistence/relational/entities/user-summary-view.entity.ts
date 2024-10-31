import { ViewEntity, ViewColumn } from 'typeorm';

import { USER_SUMMARY_VIEW } from '@src/v1/views/infrastructure/persistence/view.consts';

@ViewEntity(USER_SUMMARY_VIEW)
export class UserSummaryViewEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  first_name: string;

  @ViewColumn()
  last_name: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  role_name: string;

  @ViewColumn()
  status_name: string;

  @ViewColumn()
  photo_url: string;
}
