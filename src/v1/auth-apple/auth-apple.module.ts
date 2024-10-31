import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@src/v1/auth/auth.module';

import { AuthAppleController } from './auth-apple.controller';
import { AuthAppleService } from './auth-apple.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthAppleService],
  exports: [AuthAppleService],
  controllers: [AuthAppleController],
})
export class AuthAppleModule {}
