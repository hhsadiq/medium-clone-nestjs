/* eslint-disable prettier/prettier */
import {
  Controller,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

import { FollowService } from '@src/follow/follow.service';
import { User } from '@src/users/domain/user';

@ApiTags('User Follower')
@Controller({
  path: 'profiles',
  version: '1',
})
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':username/follow')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  @ApiOkResponse({ type: User })
  async followUser(
    @Param('username') username: string,
    @Request() req,
  ): Promise<any> {
    return await this.followService.followUser(req.user.id, username);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':username/follow')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
  })
  @ApiOkResponse({ type: User })
  async unfollowUser(
    @Param('username') username: string,
    @Request() req,
  ): Promise<any> {
    return await this.followService.unfollowUser(req.user.id, username);
  }
}
