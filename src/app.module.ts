import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppModule as v1AppModule } from './v1/app.module';
import { AppModule as v2AppModule } from './v2/app.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api/v1',
        module: v1AppModule,
      },
      {
        path: 'api/v2',
        module: v2AppModule,
      },
    ]),
    v1AppModule,
    v2AppModule,
  ],
})
export class AppModule {}
