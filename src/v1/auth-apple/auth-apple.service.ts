import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import appleSigninAuth from 'apple-signin-auth';

import { AllConfigType } from '@src/config/config.type';
import { SocialInterface } from '@src/social/interfaces/social.interface';

import { AuthAppleLoginDto } from './dto/auth-apple-login.dto';

@Injectable()
export class AuthAppleService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async getProfileByToken(
    loginDto: AuthAppleLoginDto,
  ): Promise<SocialInterface> {
    const data = await appleSigninAuth.verifyIdToken(loginDto.idToken, {
      audience: this.configService.get('apple.appAudience', { infer: true }),
    });

    return {
      id: data.sub,
      email: data.email,
      first_name: loginDto.firstName,
      last_name: loginDto.lastName,
    };
  }
}
