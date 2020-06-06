import ITransactionCategoryDto from '../../../../core/app/transactions/dto/iTransactionCategory.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export default class UpdateTransactionCategoryDto
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
  @IsOptional()
  @IsString()
  parentCategoryId?: string;

  @ApiProperty({
    title: 'is outcome category flag',
    type: 'boolean',
  })
  @IsBoolean()
  isOutcome: boolean;
}
