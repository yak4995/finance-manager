import { TransactionsCategoryRangeDto } from './transactionsCategoryRange.dto';
import { Period } from 'core/domain/period/enums/period.enum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionsRangeDto extends TransactionsCategoryRangeDto {
  @ApiProperty({
    title: 'by what range',
    required: true,
    enum: Period,
  })
  @IsEnum(Period)
  by: Period;
}
