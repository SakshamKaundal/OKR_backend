import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export interface GeneratedOKR {
  objective: string;
  keyResults: Array<{
    description: string;
    progress: number;
    target: number;
    metric: string;
  }>;
}

const okrSchema = z.object({
  objective: z.string().describe('The objective of the OKR'),
  keyResults: z.array(
    z.object({
      description: z.string().describe('The description of the key result'),
      progress: z
        .number()
        .min(0)
        .max(100)
        .describe('The progress of the key result'),
      target: z.number().min(0).describe('The target of the key result'),
      metric: z.string().describe('The metric of the key result'),
    }),
  ),
});

const responseSchema = zodToJsonSchema(okrSchema);

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private apiKey: string | undefined;
  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_API_KEY');
    if (!this.apiKey) {
      console.warn('GOOGLE_API_KEY is not set in environment variables');
    }
  }

  async generateOKRs(prompt: string): Promise<GeneratedOKR> {
    const systemPrompt = `You are an OKR generator for my app    

    Rules:
    - keep the goal strict as user have requested
    - keep the keyResults as the use have given
    - if the progress is not stated keep is as 0
    - if metric is not specified by the user use % only, keep the metric as percentage if user have not specified it.
    - if user have specified the metrics , same metrics should be shown as result and name the metrics  according to input provided by user
    example : if user have given
    usaer input : learn react
    i want to learn useref and i know 2/5 modules of it
    {
      "title": Learn react,
      "keyResults": [
        {
          "description": learn useRef,
          "progress": 2,
          "target": 5,
          "metric": modules
        }
      ]
    }
    - keep the generated key-results and objective same as what use have given done and any thing new. with correct spellings and improved grammar of the sentence
    - keep the title as a parent of the key-results which will define all key result in a concise way
    expamples :
    user input : learn react , typescript , js
    output : {
      "title": Learn Frontend development ,
      "keyResults": [
        {
          "description": learn react,
          "progress": 0,
          "target": 100,
          "metric":%
        },
     {
          "description": learn typescript,
          "progress": 0,
          "target": 100,
          "metric":%
        },
    {
          "description": learn js,
          "progress": 0,
          "target": 100,
          "metric":%
        }
      ]
    }`;

    const userMessage = `Generate OKRs for: ${prompt}`;

    try {
      if (!this.apiKey) {
        throw new Error('GOOGLE_API_KEY is not configured');
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt + '\n\n' + userMessage,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            topP: 0.8,
            responseSchema: responseSchema,
          },
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as Record<string, unknown>;
        throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      if (!data.candidates || !data.candidates[0]) {
        throw new Error('No response from Gemini API');
      }

      const contentPart = data.candidates[0].content?.parts?.[0];
      if (!contentPart || !contentPart.text) {
        throw new Error('No text content in API response');
      }

      try {
        const parsedOKR = okrSchema.parse(JSON.parse(contentPart.text));
        this.logger.debug('Successfully generated OKR:', parsedOKR);
        return parsedOKR;
      } catch (parseError) {
        this.logger.error('Failed to parse API response:', contentPart.text);
        this.logger.error('Parse error:', parseError);
        throw new Error(
          `Invalid response from API: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`,
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('OKR generation failed:', errorMessage);
      throw new Error(`Failed to generate OKRs: ${errorMessage}`);
    }
  }
}
