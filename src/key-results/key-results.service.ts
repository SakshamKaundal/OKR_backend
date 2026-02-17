import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KeyResultsService {
  constructor(private prismaService: PrismaService) {}

  async create(id: number, createKeyResultDto: CreateKeyResultDto) {
    const objective = await this.prismaService.objective.findUnique({
      where: { id },
    });

    if (!objective) {
      throw new NotFoundException(`Objective with ID ${id} not found`);
    }

    const keyResult = await this.prismaService.keyResult.create({
      data: {
        ...createKeyResultDto,
        objectiveId: id,
      },
    });

    return keyResult;
  }

  async remove(objectiveId: number, keyResultsId: number) {
    const keyResult = await this.prismaService.keyResult.findUnique({
      where: { id: keyResultsId },
    });

    if (!keyResult) {
      throw new NotFoundException(
        `Key Result with ID ${keyResultsId} not found`,
      );
    }

    await this.prismaService.keyResult.delete({
      where: { id: keyResultsId },
    });
  }
}
