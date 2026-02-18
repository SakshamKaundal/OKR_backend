import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOkrDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
