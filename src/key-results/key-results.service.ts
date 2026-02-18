import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';
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

  async update(
    objectiveId: number,
    keyResultId: number,
    updateKeyResultDto: UpdateKeyResultDto,
  ) {
    const keyResult = await this.prismaService.keyResult.findUnique({
      where: { id: keyResultId },
    });

    if (!keyResult) {
      throw new NotFoundException(
        `Key Result with ID ${keyResultId} not found`,
      );
    }

    if (keyResult.objectiveId !== objectiveId) {
      throw new NotFoundException(
        `Key Result does not belong to this objective`,
      );
    }

    const progress = updateKeyResultDto.progress ?? keyResult.progress;
    const target = updateKeyResultDto.target ?? keyResult.target;
    const isCompleted = progress >= target;

    return await this.prismaService.keyResult.update({
      where: { id: keyResultId },
      data: {
        ...updateKeyResultDto,
        isCompleted,
      },
    });
  }

  async remove(objectiveId: number, keyResultId: number) {
    const keyResult = await this.prismaService.keyResult.findUnique({
      where: { id: keyResultId },
    });

    if (!keyResult) {
      throw new NotFoundException(
        `Key Result with ID ${keyResultId} not found`,
      );
    }

    if (keyResult.objectiveId !== objectiveId) {
      throw new NotFoundException(
        `Key Result does not belong to this objective`,
      );
    }

    await this.prismaService.keyResult.delete({
      where: { id: keyResultId },
    });

    return { success: true };
  }
}
