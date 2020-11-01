import { Period } from '@domain/period/enums/period.enum';
import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class DistributingMetricItemDto {
  @ApiProperty({
    title: 'frequency of distributing',
    required: true,
    enum: Period,
  })
  @IsEnum(AvailableAnalyticMetric)
  period: Period;

  @ApiProperty({
    title: 'which metric',
    required: true,
    enum: AvailableAnalyticMetric,
  })
  @IsEnum(AvailableAnalyticMetric)
  metric: AvailableAnalyticMetric;

  @ApiProperty({
    title: 'filter by',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    title: 'in which currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  baseCurrency?: string;
}
