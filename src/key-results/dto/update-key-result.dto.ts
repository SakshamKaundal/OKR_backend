import { IsInt, Min, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateKeyResultDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  progress?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  target?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  metric?: string;
}
