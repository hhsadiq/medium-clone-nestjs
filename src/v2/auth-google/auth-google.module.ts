import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@src/v2/auth/auth.module';

import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthGoogleService],
  exports: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
