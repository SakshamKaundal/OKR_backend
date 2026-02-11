import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma.service';

export class TestApp {
  private app: INestApplication | null = null;
  private module: TestingModule | null = null;
  private prismaService: PrismaService | null = null;

  async create(): Promise<INestApplication> {
    if (this.app) {
      return this.app;
    }

    try {
      this.module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      this.app = this.module.createNestApplication();

      // Add the same validation pipes as in main.ts
      this.app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      );

      await this.app.init();

      this.prismaService = this.module.get(PrismaService);

      return this.app;
    } catch (error) {
      throw new Error(
        `Failed to create test application: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async cleanup(): Promise<void> {
    try {
      if (this.app) {
        await this.app.close();
        this.app = null;
      }
      if (this.module) {
        await this.module.close();
        this.module = null;
      }
      this.prismaService = null;
    } catch (error) {
      console.error('Failed to cleanup test application:', error);
    }
  }

  async clearDatabase(): Promise<void> {
    if (!this.prismaService) {
      throw new Error('Test application not created. Call create() first.');
    }

    try {
      await this.prismaService.objective.deleteMany({});
      await this.prismaService.keyResult.deleteMany({});
    } catch (error) {
      throw new Error(
        `Failed to clear database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  getApplication(): INestApplication {
    if (!this.app) {
      throw new Error('Test application not created. Call create() first.');
    }
    return this.app;
  }

  getPrismaService(): PrismaService {
    if (!this.prismaService) {
      throw new Error('Test application not created. Call create() first.');
    }
    return this.prismaService;
  }
}
