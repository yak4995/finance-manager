import SessionsManagementInputPort from '../ports/sessionsManagementInput.port';
import AuthorityOutputPort from '../ports/authorityOutput.port';
import UserCredentialsManagementInputPort from '../ports/userCredentialsManagementInput.port';
import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import UpdateUserPasswordDto from '../dto/updateUserPassword.dto';
import IRepository from '../../../domain/repository.interface';
import IUserCredential from '../entities/userCredential.interface';
import ITransportService from '../../transportService.interface';
import EntityFactory from '../../entityFactory';

export class AuthorityInteractor
  implements SessionsManagementInputPort, UserCredentialsManagementInputPort {
  constructor(
    private readonly entityFactory: EntityFactory,
    private readonly userCredentialRepo: IRepository<IUserCredential>,
    private readonly transportService: ITransportService,
    private readonly outputPort: AuthorityOutputPort,
  ) {}

  public async signUp(payload: UserRegisterDto): Promise<void> {
    // we should use outputPort methods
  }

  public async signIn(payload: UserLoginDto): Promise<void> {
    // we should use outputPort methods
  }

  public async signOut(user: IUser): Promise<void> {
    // we should use outputPort methods
  }

  public async changeAccountInfo(
    user: IUser,
    payload: UserInfoDto,
  ): Promise<void> {
    // we should use outputPort methods
  }

  public async changeProfileImage(
    user: IUser,
    newProfileImagepath: string,
  ): Promise<void> {
    // we should use outputPort methods
  }

  public async changePassword(
    user: IUser,
    payload: UpdateUserPasswordDto,
  ): Promise<void> {
    // we should use outputPort methods
  }

  public async deleteAccount(user: IUser): Promise<void> {
    // we should use outputPort methods
  }
}
