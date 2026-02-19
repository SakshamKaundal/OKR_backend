import { IsString, IsNotEmpty } from 'class-validator';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
