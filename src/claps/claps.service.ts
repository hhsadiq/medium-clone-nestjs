import { Injectable } from '@nestjs/common';

import { ArticlesService } from '@src/articles/articles.service';
import { Article } from '@src/articles/domain/article';
import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';

import { ClapAbstractRepository } from './infrastructure/persistence/clap.abstract.repository';

@Injectable()
export class ClapsService {
  constructor(
    private readonly clapRepository: ClapAbstractRepository,
    private readonly articlesService: ArticlesService,
  ) {}

  async clapArticle(articleId: Article['id'], userJwtPayload: JwtPayloadType) {
    const userIdAsNumber =
      typeof userJwtPayload.id === 'string'
        ? parseInt(userJwtPayload.id, 10)
        : userJwtPayload.id;
    const article = await this.articlesService.findOne(articleId);

    const clap = await this.clapRepository.createOrIncrement(
      articleId,
      userIdAsNumber,
    );

    const totalClaps = await this.clapRepository.getTotalClaps(articleId);

    return {
      id: clap.id,
      articleId: clap.articleId,
      userId: clap.userId,
      counter: clap.counter,
      createdAt: clap.createdAt,
      updatedAt: clap.updatedAt,
      articleTitle: article.title,
      totalClaps,
    };
  }
}
