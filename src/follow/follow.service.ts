import { Injectable } from '@nestjs/common';

import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';
import { FollowAbstractRepository } from '@src/follow/infrastructure/persistence/follow.abstract.repository';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowAbstractRepository) {}

  async getFollowings(userJwtPayload: JwtPayloadType) {
    return await this.followRepository.getFollowings(userJwtPayload.id);
  }
}
