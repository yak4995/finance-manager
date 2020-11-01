import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import IUserLoginDto from '@app/users/dto/iUserLogin.dto';

export default class UserLoginDto implements IUserLoginDto {
  @ApiProperty({
    title: 'user email',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'user password',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  authorityData: any;
}
