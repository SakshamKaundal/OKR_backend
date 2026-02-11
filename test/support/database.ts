import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

export interface TestDatabaseConfig {
  image: string;
  database: string;
  username: string;
  password: string;
  port: number;
}

export class TestDatabase {
  private static container: StartedPostgreSqlContainer | null = null;
  private static readonly config: TestDatabaseConfig = {
    image: 'postgres:15-alpine',
    database: 'test_db',
    username: 'test_user',
    password: 'test_pass',
    port: 5432,
  };

  static async start(): Promise<StartedPostgreSqlContainer> {
    if (this.container) {
      return this.container;
    }

    try {
      this.container = await new PostgreSqlContainer(this.config.image)
        .withDatabase(this.config.database)
        .withUsername(this.config.username)
        .withPassword(this.config.password)
        .withExposedPorts(this.config.port)
        .withStartupTimeout(30000)
        .start();

      return this.container;
    } catch (error) {
      throw new Error(
        `Failed to start test database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  static async stop(): Promise<void> {
    if (!this.container) return;

    try {
      await this.container.stop();
      this.container = null;
    } catch (error) {
      console.error('Failed to stop test database:', error);
    }
  }

  static getConnectionUri(): string {
    if (!this.container) {
      throw new Error('Test database not started. Call start() first.');
    }
    return this.container.getConnectionUri();
  }

  static getContainer(): StartedPostgreSqlContainer | null {
    return this.container;
  }
}
