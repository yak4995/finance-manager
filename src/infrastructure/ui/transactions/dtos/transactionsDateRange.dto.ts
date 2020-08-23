import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TransactionsDateRangeDto {
  @ApiProperty({
    title: 'start date',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateStart: Date;

  @ApiProperty({
    title: 'start date',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateEnd: Date;
}
