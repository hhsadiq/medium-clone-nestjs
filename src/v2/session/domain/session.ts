import { User } from '@src/v2/users/domain/user';

export class Session {
  id: number | string;
  user: User;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
