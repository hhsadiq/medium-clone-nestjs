import { Module } from '@nestjs/common';

import { GenAiService } from './gen-ai.service';

@Module({
  providers: [GenAiService],
  exports: [GenAiService],
})
export class GenAiModule {}
