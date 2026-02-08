import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} objective`;
  }

  // update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
  //   return `This action updates a #${id} objective`;
  // }

  remove(id: number) {
    return `This action removes a #${id} objective`;
  }
}
