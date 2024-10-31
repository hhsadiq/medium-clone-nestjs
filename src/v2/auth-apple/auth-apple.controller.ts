import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@src/v2/auth/auth.service';
import { LoginResponseDto } from '@src/v2/auth/dto/login-response.dto';

import { AuthAppleService } from './auth-apple.service';
import { AuthAppleLoginDto } from './dto/auth-apple-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/apple',
  version: '2',
})
export class AuthAppleController {
  constructor(
    private readonly authService: AuthService,
    private readonly authAppleService: AuthAppleService,
  ) {}

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthAppleLoginDto): Promise<LoginResponseDto> {
    const socialData = await this.authAppleService.getProfileByToken(loginDto);

    return this.authService.validateSocialLogin('apple', socialData);
  }
}
