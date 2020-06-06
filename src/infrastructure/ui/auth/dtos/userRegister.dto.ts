import IUserRegisterDto from '../../../../core/app/users/dto/iUserRegister.dto';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UserRegisterDto implements IUserRegisterDto {
  @ApiProperty({
    title: 'user email',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'user password',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  authorityData: any;
}
