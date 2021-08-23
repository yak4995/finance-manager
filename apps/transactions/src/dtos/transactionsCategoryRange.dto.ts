import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TransactionsDateRangeDto } from './transactionsDateRange.dto';

export class TransactionsCategoryRangeDto extends TransactionsDateRangeDto {
  @ApiProperty({
    title: 'transaction category id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
