import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '@src/utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '@src/utils/infinity-pagination';

import { ClapsService } from './claps.service';
import { Clap } from './domain/clap';
import { FindAllClapsDto } from './dto/find-all-claps.dto';

@ApiTags('Claps')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'claps',
  version: '1',
})
export class ClapsController {
  constructor(private readonly clapsService: ClapsService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Clap),
  })
  async findAll(
    @Query() query: FindAllClapsDto,
  ): Promise<InfinityPaginationResponseDto<Clap>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.clapsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.clapsService.findOne(id);
  }
}
