import IAuthorityService from '../../users/interfaces/authorityService.interface';
import IUserRegisterDto from '../../users/dto/iUserRegister.dto';
import IUserLoginDto from '../../users/dto/iUserLogin.dto';
import IUserCredential from '../../users/entities/userCredential.interface';
import IUser from '../../../domain/users/entities/user.interface';
import { Roles } from '../../users/enums/roles.enum';

export default class FakeAuthorityService implements IAuthorityService {
  async signUp(payload: IUserRegisterDto): Promise<IUserCredential> {
    if (payload.email === 'registrationDenied@example.com') {
      throw new Error('Registration process has been interrupted!');
    }
    return {
      id: 'fakeId',
      isActive: true,
      profileImageUrl: null,
      email: payload.email,
      roles: [Roles.USER],
    };
  }

  async signIn(payload: IUserLoginDto): Promise<IUserCredential> {
    if (payload.email === 'incorrectUser@example.com') {
      throw new Error('This user has not been found in auth service!');
    }
    return {
      id: 'fakeId',
      isActive: true,
      profileImageUrl: null,
      email: payload.email,
      roles: [Roles.USER],
    };
  }

  async signOut(user: IUser): Promise<boolean> {
    if (user.id === 'exceptionId') {
      throw new Error('Logout is not available!');
    }
    return user.id !== 'incorrectId';
  }

  async deleteAccount(user: IUser): Promise<boolean> {
    if (user.id === 'exceptionId') {
      throw new Error('Deleting is not available!');
    }
    return user.id !== 'incorrectId';
  }
}
