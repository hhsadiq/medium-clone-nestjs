import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@src/v2/auth/auth.module';

import { AuthTwitterController } from './auth-twitter.controller';
import { AuthTwitterService } from './auth-twitter.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthTwitterService],
  exports: [AuthTwitterService],
  controllers: [AuthTwitterController],
})
export class AuthTwitterModule {}
