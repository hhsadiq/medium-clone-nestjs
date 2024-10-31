import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@src/v1/auth/auth.service';
import { LoginResponseDto } from '@src/v1/auth/dto/login-response.dto';

import { AuthTwitterService } from './auth-twitter.service';
import { AuthTwitterLoginDto } from './dto/auth-twitter-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/twitter',
  version: '1',
})
export class AuthTwitterController {
  constructor(
    private readonly authService: AuthService,
    private readonly authTwitterService: AuthTwitterService,
  ) {}

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: AuthTwitterLoginDto,
  ): Promise<LoginResponseDto> {
    const socialData =
      await this.authTwitterService.getProfileByToken(loginDto);

    return this.authService.validateSocialLogin('twitter', socialData);
  }
}
