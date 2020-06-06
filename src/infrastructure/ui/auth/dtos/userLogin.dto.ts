import IUserLoginDto from '../../../../core/app/users/dto/iUserLogin.dto';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
