import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@src/v2/auth/auth.module';

import { AuthFacebookController } from './auth-facebook.controller';
import { AuthFacebookService } from './auth-facebook.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthFacebookService],
  exports: [AuthFacebookService],
  controllers: [AuthFacebookController],
})
export class AuthFacebookModule {}
