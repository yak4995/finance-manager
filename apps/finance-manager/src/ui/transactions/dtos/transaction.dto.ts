import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import ITransactionDto from '@app/transactions/dto/iTransaction.dto';

export class TransactionDto implements ITransactionDto {
  @ApiProperty({
    title: 'date and time of transaction',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  datetime: Date;

  @ApiProperty({
    title: 'amount of money for transaction',
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    title: 'transaction category id',
    required: true,
  })
  @IsString()
  transactionCategoryId: string;

  @ApiProperty({
    title: 'currency id',
    required: true,
  })
  @IsString()
  currencyId: string;

  @ApiProperty({
    title: 'description',
    required: true,
  })
  @IsString()
  description: string;
}
