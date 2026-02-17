import { Module } from '@nestjs/common';
import { ObjectivesModule } from './objectives/objectives.module';
import { ConfigModule } from '@nestjs/config';
import { KeyResultsModule } from './key-results/key-results.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ObjectivesModule,
    KeyResultsModule,
    AiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
