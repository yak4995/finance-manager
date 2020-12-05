import { IsNotEmpty, IsString } from 'class-validator';

export class RateQuery {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  forDate: string;
}
