import { Controller, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';

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

  @Patch(':keyResultId')
  async update(
    @Param('id') id: string,
    @Param('keyResultId') keyResultId: string,
    @Body() updateKeyResultDto: UpdateKeyResultDto,
  ) {
    try {
      return await this.keyResultsService.update(
        Number.parseInt(id),
        Number.parseInt(keyResultId),
        updateKeyResultDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':keyResultId')
  async remove(
    @Param('id') id: string,
    @Param('keyResultId') keyResultId: string,
  ) {
    try {
      return await this.keyResultsService.remove(
        Number.parseInt(id),
        Number.parseInt(keyResultId),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
