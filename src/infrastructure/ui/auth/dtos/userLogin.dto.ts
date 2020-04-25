import IUserLoginDto from '../../../../core/app/users/dto/iUserLogin.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export default class UserLoginDto implements IUserLoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  authorityData: any;
}
