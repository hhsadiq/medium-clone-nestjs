import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Facebook } from 'fb';

import { AllConfigType } from '@src/config/config.type';
import { SocialInterface } from '@src/social/interfaces/social.interface';

import { AuthFacebookLoginDto } from './dto/auth-facebook-login.dto';
import { FacebookInterface } from './interfaces/facebook.interface';

@Injectable()
export class AuthFacebookService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async getProfileByToken(
    loginDto: AuthFacebookLoginDto,
  ): Promise<SocialInterface> {
    const fb: Facebook = new Facebook({
      appId: this.configService.get('facebook.appId', {
        infer: true,
      }),
      appSecret: this.configService.get('facebook.appSecret', {
        infer: true,
      }),
      version: 'v7.0',
    });
    fb.setAccessToken(loginDto.accessToken);

    const data: FacebookInterface = await new Promise((resolve) => {
      fb.api(
        '/me',
        'get',
        { fields: 'id,last_name,email,first_name' },
        (response) => {
          resolve(response);
        },
      );
    });

    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }
}
