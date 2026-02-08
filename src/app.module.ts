import { Module } from '@nestjs/common';
import { ObjectivesModule } from './objectives/objectives.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ObjectivesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
