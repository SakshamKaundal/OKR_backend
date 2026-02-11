import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;
}
