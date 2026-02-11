import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

let container: StartedPostgreSqlContainer | null = null;

export const startPostgres = async () => {
  if (container) return container;

  // Try a simpler configuration
  container = await new PostgreSqlContainer('postgres:15-alpine')
    .withDatabase('test')
    .withUsername('test')
    .withPassword('test')
    .withExposedPorts(5432)
    .start();

  return container;
};

export const stopPostgres = async () => {
  if (!container) return;
  await container.stop();
  container = null;
};
