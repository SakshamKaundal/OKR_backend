import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyResultDto } from './create-key-result.dto';
import { IsInt, Min, IsString, IsNotEmpty } from 'class-validator';

export class UpdateKeyResultDto extends PartialType(CreateKeyResultDto) {
  @IsInt()
  @Min(0)
  target: number;

  @IsString()
  @IsNotEmpty()
  metric: string;

  @IsInt()
  @Min(0)
  progress: number;
}
