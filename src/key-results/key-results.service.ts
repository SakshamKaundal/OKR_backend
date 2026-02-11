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

  findAll() {
    return `This action returns all keyResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyResult`;
  }

  // update(id: number, updateKeyResultDto: UpdateKeyResultDto) {
  //   return `This action updates a #${id} keyResult`;
  // }

  remove(id: number) {
    return `This action removes a #${id} keyResult`;
  }
}
