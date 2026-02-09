import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { UpdateOkrDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/UpdateObjectiveDto';

@Controller('objectives')
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Post()
  create(@Body() createObjectiveDto: UpdateOkrDto) {
    return this.objectivesService.create(createObjectiveDto);
  }

  @Get()
  findAll() {
    return this.objectivesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectivesService.findById(Number.parseInt(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.objectivesService.update(
      Number.parseInt(id),
      updateObjectiveDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectivesService.remove(+id);
  }

  @Get(':id/completed')
  isCompleted(@Param('id') id: string) {
    return this.objectivesService.isObjectiveCompleted(Number.parseInt(id));
  }
}
