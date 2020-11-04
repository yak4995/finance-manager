import { IsNotEmpty, IsString } from 'class-validator';

export class CurrencyCode {
  @IsString()
  @IsNotEmpty()
  code: string;
}
