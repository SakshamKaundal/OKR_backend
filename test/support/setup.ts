// Podman configuration for Testcontainers
export const configurePodman = (): void => {
  const podmanSocket = '/run/podman/podman.sock';

  process.env.TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE = podmanSocket;
  process.env.DOCKER_HOST = `unix://${podmanSocket}`;
  process.env.TESTCONTAINERS_RYUK_DISABLED = 'true';

  // Ensure consistent container behavior
  process.env.TESTCONTAINERS_HOST_OVERRIDE = 'localhost';
};

// Test environment setup
export const setupTestEnvironment = (): void => {
  configurePodman();

  // Set test-specific environment variables
  process.env.NODE_ENV = 'test';

  // Increase timeout for container operations
  jest.setTimeout(60000);
};
