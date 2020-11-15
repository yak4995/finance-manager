import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import IUserRegisterDto from '@app/users/dto/iUserRegister.dto';

export default class UserRegisterDto implements IUserRegisterDto {
  @ApiProperty({
    title: 'user email',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  /*@ApiProperty({
    title: 'user password',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()*/
  authorityData: any;
}
