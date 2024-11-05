import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

import validateConfig from '@src/utils/validate-config';

import { GenAiConfig } from './gen-ai-config.type';

class GoogleAIValidator {
  @IsOptional()
  @IsString()
  GEN_AI_API_KEY?: string;

  @IsOptional()
  @IsString()
  GEN_AI_MODEL?: string;
}

export default registerAs<GenAiConfig>('genAi', () => {
  validateConfig(process.env, GoogleAIValidator);

  return {
    genAiApiKey: process.env.GEN_AI_API_KEY,
    genAiModel: process.env.GEN_AI_MODEL,
  };
});
