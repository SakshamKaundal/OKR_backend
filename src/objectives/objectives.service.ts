import { Injectable, NotFoundException } from '@nestjs/common';
import { OkrDto } from './dto/create-objective.dto';
import { PrismaService } from '../prisma.service';

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

  // update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
  //   return `This action updates a #${id} objective`;
  // }

  async remove(id: number) {
    await this.prismaService.objective.delete({
      where: { id },
    });
  }
}
