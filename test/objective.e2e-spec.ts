import { setupTestEnvironment } from './support/setup';
import { DatabaseManager } from './support/manager';
import { TestApp } from './support/app';
import request from 'supertest';

setupTestEnvironment();

interface ObjectiveResponse {
  id: number;
  title: string;
  createdAt: string;
}

describe('Objectives API', () => {
  let testApp: TestApp;

  beforeAll(async () => {
    await DatabaseManager.initialize();
  }, 60000);

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.create();
    await testApp.clearDatabase();
  });

  afterEach(async () => {
    await testApp.cleanup();
  });

  afterAll(async () => {
    await DatabaseManager.cleanup();
  }, 30000);

  describe('GET /objectives', () => {
    it('should return all objectives', async () => {
      // Arrange
      const prisma = testApp.getPrismaService();
      const createdObjective = await prisma.objective.create({
        data: { title: 'Test Objective' },
        include: { keyResults: true },
      });

      // Act & Assert
      const response = await request(testApp.getApplication().getHttpServer())
        .get('/objectives')
        .expect(200);

      expect(response.body).toEqual([
        {
          id: createdObjective.id,
          title: 'Test Objective',
          createdAt: createdObjective.createdAt.toISOString(),
          keyResults: [],
        },
      ]);
    });
  });

  describe('POST /objectives', () => {
    it('should create an objective', async () => {
      // Arrange
      const objectiveData = { title: 'New Objective' };

      // Act
      const response = await request(testApp.getApplication().getHttpServer())
        .post('/objectives')
        .send(objectiveData)
        .expect(201);

      // Assert
      const body = response.body as ObjectiveResponse;
      expect(body).toMatchObject({
        title: 'New Objective',
      });
      expect(body.id).toBeDefined();
      expect(body.createdAt).toBeDefined();
    });

    it('should return 400 for invalid data', async () => {
      // Arrange
      const invalidData = { invalidField: 'value' };

      // Act & Assert
      await request(testApp.getApplication().getHttpServer())
        .post('/objectives')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('DELETE /objectives/:id', () => {
    it('should delete an objective by id', async () => {
      // Arrange
      const prisma = testApp.getPrismaService();
      const createdObjective = await prisma.objective.create({
        data: { title: 'Objective to Delete' },
      });

      // Act & Assert
      await request(testApp.getApplication().getHttpServer())
        .delete(`/objectives/${createdObjective.id}`)
        .expect(200);

      // Verify deletion
      const deletedObjective = await prisma.objective.findUnique({
        where: { id: createdObjective.id },
      });
      expect(deletedObjective).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
      // Arrange
      const nonExistentId = 99999;

      // Act & Assert
      await request(testApp.getApplication().getHttpServer())
        .delete(`/objectives/${nonExistentId}`)
        .expect(404);
    });
  });
});
