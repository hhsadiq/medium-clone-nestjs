import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { diff, unique } from 'radash';
import slugify from 'slugify';
import { Repository } from 'typeorm';

import { UserFavouriteArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/user-favourite-article.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';
import { CommentsService } from '@src/comments/comments.service';
import { Comment } from '@src/comments/domain/comment';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { DatabaseHelperRepository } from '@src/database-helpers/database-helper';
import { Tag } from '@src/tags/domain/tag';
import { TagsService } from '@src/tags/tags.service';
import { UsersService } from '@src/users/users.service';
import { pagination } from '@src/utils/pagination';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleAbstractRepository } from './infrastructure/persistence/article.abstract.repository';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleAbstractRepository,
    private readonly commentsService: CommentsService,
    private readonly tagsService: TagsService,
    private readonly dbHelperRepository: DatabaseHelperRepository,
    private userService: UsersService,
    @InjectRepository(UserFavouriteArticleEntity)
    private readonly userFavouriteArticleRepository: Repository<UserFavouriteArticleEntity>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ): Promise<Article> {
    return this.dbHelperRepository.transactionManager.runInTransaction(
      async () =>
        this.createArticleWithTransaction(createArticleDto, userJwtPayload),
    );
  }

  private async createArticleWithTransaction(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ): Promise<Article> {
    const clonedPayload = {
      ...createArticleDto,
      authorId: userJwtPayload.id,
    };

    let tags: NullableType<Tag[]> = [];

    if (createArticleDto.tagList && createArticleDto.tagList.length > 0) {
      const uniqueTagList = unique(createArticleDto.tagList);

      tags = await this.tagsService.findByNames(uniqueTagList);

      const newTagNames = diff(
        uniqueTagList,
        tags?.map((tag) => tag.name) || [],
      );

      if (newTagNames.length > 0) {
        const newTags = await this.tagsService.createMany(
          this.tagsService.toCreateTagDtos(newTagNames),
        );

        tags = [...(tags || []), ...newTags];
      }
    }

    const articlePayload = {
      ...clonedPayload,
      tagList: tags,
      slug: this.slugify(createArticleDto.title),
    };

    const article = await this.articleRepository.create(articlePayload);
    return await this.findAndValidate('id', article?.id, true);
  }

  slugify(title: string): string {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const uniqueSuffix = this.generateUniqueSuffix();

    return `${baseSlug}-${uniqueSuffix}`;
  }

  generateUniqueSuffix(length: number = 11): string {
    const charset =
      'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    let id = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));

    for (let i = 0; i < length; i++) {
      id += charset[randomValues[i] & 63]; // Ensure the index is twithin the range 0-63
    }

    return id;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.articleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, total]: [Article[], number] =
      await this.articleRepository.findAllWithPaginationStandard({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
        },
      });
    return pagination(data, total, paginationOptions);
  }

  findOne(id: Article['id']) {
    return this.findAndValidate('id', id, true);
  }

  async update(id: Article['id'], updateArticleDto: UpdateArticleDto) {
    const article = await this.findAndValidate('id', id);

    const { title, ...rest } = updateArticleDto;

    const payload = {
      ...rest,
      title,
      ...(title && title !== article.title && { slug: this.slugify(title) }),
    };

    const updatedArticle = await this.articleRepository.update(
      article,
      payload,
    );

    return await this.findAndValidate('id', updatedArticle.id, true);
  }

  remove(id: Article['id']) {
    return this.articleRepository.remove(id);
  }

  async createComment(
    slug: Article['slug'],
    body: Comment['body'],
    userJwtPayload: JwtPayloadType,
  ) {
    const article = await this.findAndValidate('slug', slug);

    return await this.commentsService.create(article.id, body, userJwtPayload);
  }

  async findAllCommentsWithPagination({
    paginationOptions,
    slug,
  }: {
    paginationOptions: IPaginationOptions;
    slug: Article['slug'];
  }) {
    const article = await this.findAndValidate('slug', slug);

    return this.commentsService.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      articleId: article.id,
    });
  }

  async removeComment(
    id: Comment['id'],
    slug: Article['slug'],
    userJwtPayload: JwtPayloadType,
  ) {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw NOT_FOUND('Article', { slug });
    }

    return await this.commentsService.remove(id, userJwtPayload);
  }

  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // captilize first letter of the field name
    if (typeof this.articleRepository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on article repository.`,
        field,
      );
    }

    const article = await this.articleRepository[repoFunction](value);
    if (!article) {
      throw NOT_FOUND('Article', { [field]: value });
    }
    return article;
  }

  async makeFavourite(slug: Article['slug'], userId: number) {
    const checkArticle = await this.articleRepository.findBySlug(slug);
    if (!checkArticle) {
      throw new NotFoundException(`Article with slug "${slug}" not found.`);
    }

    const alreadyFavourtie = await this.userFavouriteArticleRepository.findOne({
      where: {
        user_id: userId,
        article_id: checkArticle.id,
      },
    });

    if (alreadyFavourtie)
      throw new BadRequestException(`${slug}, article is already favourite.`);

    const favouriteArticle = this.userFavouriteArticleRepository.create({
      user_id: userId,
      article_id: checkArticle.id,
    });
    await this.userFavouriteArticleRepository.save(favouriteArticle);

    return ArticleMapper.toDomainFavourite(checkArticle, true);
  }

  async removeFavourite(slug: Article['slug'], userId: number) {
    const checkArticle = await this.articleRepository.findBySlug(slug);
    if (!checkArticle) {
      throw new NotFoundException(`Article with slug "${slug}" not found.`);
    }

    const alreadyFavourtie = await this.userFavouriteArticleRepository.findOne({
      where: {
        user_id: userId,
        article_id: checkArticle.id,
      },
    });

    if (!alreadyFavourtie)
      throw new BadRequestException(
        `${slug}, article is already not  favourite.`,
      );

    await this.userFavouriteArticleRepository.delete(alreadyFavourtie.id);

    return ArticleMapper.toDomainFavourite(checkArticle, false);
  }
}
