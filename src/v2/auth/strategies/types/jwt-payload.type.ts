import { Session } from '@src/v2/session/domain/session';
import { User } from '@src/v2/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
