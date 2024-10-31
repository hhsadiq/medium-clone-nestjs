import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

import { ERROR_MESSAGES } from '@src/common/constants';
import { UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { AllConfigType } from '@src/config/config.type';
import { SocialInterface } from '@src/social/interfaces/social.interface';

import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService<AllConfigType>) {
    this.google = new OAuth2Client(
      configService.get('google.clientId', { infer: true }),
      configService.get('google.clientSecret', { infer: true }),
    );
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [
        this.configService.getOrThrow('google.clientId', { infer: true }),
      ],
    });

    const data = ticket.getPayload();

    if (!data) {
      throw UNPROCESSABLE_ENTITY(ERROR_MESSAGES.INCORRECT('token'), 'token');
    }

    return {
      id: data.sub,
      email: data.email,
      first_name: data.given_name,
      last_name: data.family_name,
    };
  }
}
