import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TransactionsCategoryRangeDto } from './transactionsCategoryRange.dto';

import { Period } from '@domain/period/enums/period.enum';

export class TransactionsRangeDto extends TransactionsCategoryRangeDto {
  @ApiProperty({
    title: 'by what range',
    required: true,
    enum: Period,
  })
  @IsEnum(Period)
  by: Period;
}
