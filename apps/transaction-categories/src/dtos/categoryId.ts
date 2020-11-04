import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryId {
  @IsString()
  @IsNotEmpty()
  id: string;
}
