import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesService } from './objectives.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ObjectivesService', () => {
  let objectivesService: ObjectivesService;

  const mockPrismaService = {
    objective: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectivesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    objectivesService = await module.resolve(ObjectivesService);
  });

  describe('findAll', () => {
    it('should return all the key Results', async () => {
      const mockOkrs = [
        {
          id: 1,
          title: 'nest full',
          keyResults: [
            {
              description: 'learn js',
              progress: 25,
            },
            {
              description: 'nestjs and more',
              progress: 36,
            },
          ],
        },
      ];

      mockPrismaService.objective.findMany.mockResolvedValue(mockOkrs);
      const response = await objectivesService.findAll();

      expect(response).toEqual(mockOkrs);
    });
  });

  describe('create', () => {
    it('should return the object created ', async () => {
      const mockOkrs = [
        {
          id: 1,
          title: 'nest full',
          keyResults: [
            {
              description: 'learn js',
              progress: 25,
            },
            {
              description: 'nestjs and more',
              progress: 36,
            },
          ],
        },
      ];
      mockPrismaService.objective.create.mockResolvedValue(mockOkrs);
      const response = await objectivesService.findAll();

      expect(response).toEqual(mockOkrs);
    });
  });

  describe('findById', () => {
    it('should return the ORK which is found', async () => {
      const mockOkr = [
        {
          id: 1,
          title: 'nest full',
          keyResults: [
            {
              description: 'learn js',
              progress: 25,
            },
            {
              description: 'nestjs and more',
              progress: 36,
            },
          ],
        },
      ];

      mockPrismaService.objective.findFirst.mockResolvedValue(mockOkr);
      const response = await objectivesService.findById(1);
      expect(response).toEqual(mockOkr);
      expect(mockPrismaService.objective.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should return the 404 exception if the okr is not found', async () => {
      mockPrismaService.objective.findFirst.mockResolvedValue(null);

      await expect(objectivesService.findById(99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
