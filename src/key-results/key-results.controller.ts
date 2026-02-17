import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from './dto/create-key-result.dto';

@Controller('objectives/:id/key-results')
export class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Post()
  create(
    @Param('id') id: string,
    @Body() createKeyResultDto: CreateKeyResultDto,
  ) {
    return this.keyResultsService.create(
      Number.parseInt(id),
      createKeyResultDto,
    );
  }

  @Delete('objectives/:objectiveId/key-results/:keyResultId')
  remove(
    @Param('objectiveId') objectiveId: string,
    @Param('keyResultId') keyResultId: string,
  ) {
    return this.keyResultsService.remove(
      Number.parseInt(objectiveId),
      Number.parseInt(keyResultId),
    );
  }
}
