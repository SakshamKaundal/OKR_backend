import { Module } from '@nestjs/common';
import { ObjectivesModule } from './objectives/objectives.module';
import { ConfigModule } from '@nestjs/config';
import { KeyResultsModule } from './key-results/key-results.module';

@Module({
  imports: [
    ObjectivesModule,
    KeyResultsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
