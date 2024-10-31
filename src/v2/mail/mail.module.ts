import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailerModule } from '@src/v2/mailer/mailer.module';

import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
