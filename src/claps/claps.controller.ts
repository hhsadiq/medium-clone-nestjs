import { Controller, Post, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { Article } from '@src/articles/domain/article';
import { ClapsService } from '@src/claps/claps.service';
@ApiTags('Claps')
@Controller({
  path: 'articles',
  version: '1',
})
export class ClapsController {
  constructor(private readonly clapsService: ClapsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/clap')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Article,
  })
  clapArticle(@Param('id') id: string, @Request() request) {
    return this.clapsService.clapArticle(id, request.user);
  }
}
