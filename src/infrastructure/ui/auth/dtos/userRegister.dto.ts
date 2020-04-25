import IUserRegisterDto from '../../../../core/app/users/dto/iUserRegister.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export default class UserRegiisterDto implements IUserRegisterDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  authorityData: any;
}
