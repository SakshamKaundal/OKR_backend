export class OkrDto {
  title: string;
  keyResult: KeyResultDTO[];
}

class KeyResultDTO {
  description: string;
  progress: number;
}
