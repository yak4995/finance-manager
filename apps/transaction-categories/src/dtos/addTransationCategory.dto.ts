import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

import ITransactionCategoryDto from '@app/transactionCategories/dto/iTransactionCategory.dto';

export default class AddTransationCategoryDto
  implements ITransactionCategoryDto {
  @ApiProperty({
    title: 'transaction category name',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'id of parent transaction category',
    type: 'string',
    required: false,
  })
  @IsString()
  parentCategoryId: string;

  @ApiProperty({
    title: 'is outcome category flag',
    type: 'boolean',
  })
  @IsBoolean()
  isOutcome: boolean;
}
