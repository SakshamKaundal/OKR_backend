import { Injectable, NotFoundException } from '@nestjs/common';
import { OkrDto } from './dto/create-objective.dto';
import { PrismaService } from '../prisma.service';
import { UpdateObjectiveDto } from './dto/UpdateObjectiveDto';

@Injectable()
export class ObjectivesService {
  constructor(private prismaService: PrismaService) {}

  create(createObjectiveDto: OkrDto) {
    return this.prismaService.objective.create({
      data: {
        title: createObjectiveDto.title,
        keyResults: {
          createMany: {
            data: createObjectiveDto.keyResult.map((kr) => ({
              description: kr.description,
              progress: kr.progress,
            })),
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.objective.findMany({
      include: {
        keyResults: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    const objective = await this.prismaService.objective.findFirst({
      where: { id },
      include: { keyResults: true },
    });

    if (!objective) {
      throw new NotFoundException(`Objective with id ${id} not found`);
    }
    return objective;
  }

  async update(id: number, dto: UpdateObjectiveDto) {
    console.log(dto);

    // Update objective title only (leave key results alone)
    return this.prismaService.objective.update({
      where: { id },
      data: {
        title: dto.title,
      },
      include: {
        keyResults: true,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.objective.delete({
      where: { id },
    });
  }
}
