import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import IAuthorityService from '../../../../core/app/users/interfaces/authorityService.interface';
import UserRegisterDto from '../../../../core/app/users/dto/userRegister.dto';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';
import UserLoginDto from '../../../../core/app/users/dto/userLogin.dto';
import UserCredentialAbstractFactory from '../../../../core/app/users/factories/userCredentialFactory';
import IRepository, {
  Criteria,
} from '../../../../core/domain/repository.interface';
import JwtPayloadInterface from '../interfaces/jwt-payload.interface';
import ConfigService from '../../config/config.service';
import ISecuredUserCredential from '../../../persistance/entities/securedUserCredential';

@Injectable()
export default class AuthService implements IAuthorityService {
  private readonly userCredentialRepo: IRepository<ISecuredUserCredential>;

  constructor(
    private readonly userCredentialFactory: UserCredentialAbstractFactory,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.userCredentialRepo = userCredentialFactory.createUserCredentialRepo() as IRepository<
      ISecuredUserCredential
    >;
  }

  async signUp(payload: UserRegisterDto): Promise<IUserCredential> {
    return this.userCredentialFactory.createUserCredential({
      email: payload.email,
      passwordHash: await bcrypt.hash(
        payload.authorityData,
        Number(this.configService.get('PASSWORD_HASH_ROUNDS_COUNT')),
      ),
    } as Criteria<ISecuredUserCredential>);
  }

  async signIn(payload: UserLoginDto): Promise<IUserCredential> {
    const user: ISecuredUserCredential = await this.userCredentialRepo.findOneByAndCriteria(
      {
        email: payload.email,
      },
    );
    const isPasswordValid: boolean = await bcrypt.compare(
      payload.authorityData,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is invalid!');
    }
    return user;
  }

  signOut(_user: IUserCredential): never {
    throw new Error('Method not implemented.');
  }

  async deleteAccount(user: IUserCredential): Promise<boolean> {
    try {
      await this.userCredentialRepo.delete({ id: user.id });
      return true;
    } catch (e) {
      return false;
    }
  }

  async validateUser(payload: JwtPayloadInterface): Promise<IUserCredential> {
    return this.userCredentialRepo.findById(payload.id);
  }

  async createToken(
    jwtPayload: JwtPayloadInterface,
  ): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync(jwtPayload, {
        expiresIn: this.configService.get('JWT_TOKEN_EXPIRES_IN'),
      }),
    };
  }

  decodeToken(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
