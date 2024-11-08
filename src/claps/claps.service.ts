import { Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

import { ArticlesService } from '@src/articles/articles.service';
import { Article } from '@src/articles/domain/article';
import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';

import { ClapAbstractRepository } from './infrastructure/persistence/clap.abstract.repository';

@Injectable()
export class ClapsService {
  constructor(
    private readonly clapRepository: ClapAbstractRepository,
    private readonly articleService: ArticlesService,
  ) {}

  async clapArticle(articleId: Article['id'], userJwtPayload: JwtPayloadType) {
    if (!isUUID(articleId)) {
      throw new BadRequestException('Invalid article ID format');
    }
    const userIdAsNumber =
      typeof userJwtPayload.id === 'string'
        ? parseInt(userJwtPayload.id, 10)
        : userJwtPayload.id;

    await this.articleService.findOne(articleId);

    const clap = await this.clapRepository.createOrIncrement(
      articleId,
      userIdAsNumber,
    );

    return {
      id: clap.id,
      articleId: clap.articleId,
      userId: clap.userId,
      counter: clap.counter,
      createdAt: clap.createdAt,
      updatedAt: clap.updatedAt,
    };
  }
}
