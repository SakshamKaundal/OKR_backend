import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.keyResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyResultsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeyResultDto: UpdateKeyResultDto,
  ) {
    return this.keyResultsService.update(+id, updateKeyResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyResultsService.remove(+id);
  }
}
