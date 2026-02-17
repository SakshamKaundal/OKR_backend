import { Controller, Post, Body } from '@nestjs/common';
import { AiService, GeneratedOKR } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-okr')
  async generateOKR(@Body('prompt') prompt: string): Promise<GeneratedOKR> {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt is required');
    }

    return this.aiService.generateOKRs(prompt.trim());
  }
}
