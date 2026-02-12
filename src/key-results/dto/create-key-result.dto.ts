import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  progress: number;

  @IsInt()
  @Min(0)
  target: number;

  @IsString()
  @IsNotEmpty()
  metric: string;
}
