import { Injectable } from '@nestjs/common';

import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';

import { Clap } from './domain/clap';
import { ClapAbstractRepository } from './infrastructure/persistence/clap.abstract.repository';

@Injectable()
export class ClapsService {
  constructor(private readonly clapRepository: ClapAbstractRepository) {}

  async incrementCounter(
    articleId: Clap['articleId'],
    userId: JwtPayloadType['id'],
  ) {
    let clap = await this.clapRepository.findByArticleIdAndUserId(
      articleId,
      userId,
    );

    if (!clap) {
      const clonedPayload = {
        counter: 1,
        articleId,
        userId,
      };
      return await this.clapRepository.create(clonedPayload);
    }

    clap = await this.clapRepository.incrementCounter(
      clap.articleId,
      clap.userId,
    );

    return clap;
  }

  findOne(articleId: Clap['articleId'], userId: Clap['userId']) {
    return this.clapRepository.findByArticleIdAndUserId(articleId, userId);
  }
}
