import { execSync } from 'node:child_process';
import { TestDatabase } from './database';

export class DatabaseManager {
  static async initialize(): Promise<void> {
    try {
      // Start the test database
      const container = await TestDatabase.start();

      // Set database URL for the application
      process.env.DATABASE_URL = container.getConnectionUri();

      // Run database migrations
      this.runMigrations();

      console.log('Test database initialized successfully');
    } catch (error) {
      throw new Error(
        `Failed to initialize test database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  static async cleanup(): Promise<void> {
    try {
      await TestDatabase.stop();
      console.log('Test database cleaned up successfully');
    } catch (error) {
      console.error('Failed to cleanup test database:', error);
    }
  }

  private static runMigrations(): void {
    try {
      execSync('pnpm prisma migrate deploy', {
        stdio: 'pipe', // Reduce noise in test output
        env: process.env,
      });
    } catch (error) {
      throw new Error(
        `Failed to run database migrations: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  static getConnectionUri(): string {
    return TestDatabase.getConnectionUri();
  }
}
