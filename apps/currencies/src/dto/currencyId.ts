import { IsNotEmpty, IsString } from 'class-validator';

export class CurrencyId {
  @IsString()
  @IsNotEmpty()
  id: string;
}
