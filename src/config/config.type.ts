import { DatabaseConfig } from '@src/database/config/database-config.type';
import { AuthConfig } from '@src/v2/auth/config/auth-config.type';
import { AppleConfig } from '@src/v2/auth-apple/config/apple-config.type';
import { FacebookConfig } from '@src/v2/auth-facebook/config/facebook-config.type';
import { GoogleConfig } from '@src/v2/auth-google/config/google-config.type';
import { TwitterConfig } from '@src/v2/auth-twitter/config/twitter-config.type';
import { FileConfig } from '@src/v2/files/config/file-config.type';
import { MailConfig } from '@src/v2/mail/config/mail-config.type';

import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  apple: AppleConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  facebook: FacebookConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  twitter: TwitterConfig;
};
