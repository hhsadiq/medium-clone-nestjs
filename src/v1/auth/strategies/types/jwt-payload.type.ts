import { Session } from '@src/v1/session/domain/session';
import { User } from '@src/v1/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
