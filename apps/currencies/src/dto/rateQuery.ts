import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class RateQuery {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNumber()
  forDate: number;
}
