import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    title: 'page number',
    required: true,
  })
  @IsNumberString()
  page: number;

  @ApiProperty({
    title: 'items per page',
    required: true,
  })
  @IsNumberString()
  perPage: number;

  @ApiProperty({
    title: 'datetime | amount, field for sort',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  orderField: 'datetime' | 'amount';

  @ApiProperty({
    title: 'ASC | DESC',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  orderBy: 'ASC' | 'DESC';
}
