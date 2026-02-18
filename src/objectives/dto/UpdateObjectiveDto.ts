import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateObjectiveDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
}
