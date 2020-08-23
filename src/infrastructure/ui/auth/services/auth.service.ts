import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import IAuthorityService from '../../../../core/app/users/interfaces/authorityService.interface';
import IUserRegisterDto from '../../../../core/app/users/dto/iUserRegister.dto';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';
import IUserLoginDto from '../../../../core/app/users/dto/iUserLogin.dto';
import UserCredentialAbstractFactory from '../../../../core/app/users/factories/userCredentialFactory';
import IRepository, {
  Criteria,
} from '../../../../core/domain/repository.interface';
import JwtPayloadInterface from '../interfaces/jwt-payload.interface';
import ISecuredUserCredential from '../../../persistance/entities/securedUserCredential';
import IUser from '../../../../core/domain/users/entities/user.interface';

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

  public async signUp(payload: IUserRegisterDto): Promise<IUserCredential> {
    return this.userCredentialFactory.createUserCredential({
      email: payload.email,
      passwordHash: await bcrypt.hash(
        payload.authorityData,
        Number(this.configService.get<number>('PASSWORD_HASH_ROUNDS_COUNT')),
      ),
    } as Criteria<IUserCredential>);
  }

  public async signIn(payload: IUserLoginDto): Promise<IUserCredential> {
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

  public signOut(_user: IUserCredential): never {
    throw new Error('Method not implemented.');
  }

  public async deleteAccount(user: IUser): Promise<boolean> {
    try {
      await this.userCredentialRepo.delete({ id: user.id });
      return true;
    } catch (e) {
      Logger.error(e.message, e.stack, 'AuthService::deleteAccount');
      return false;
    }
  }

  public async validateUser(
    payload: JwtPayloadInterface,
  ): Promise<IUserCredential> {
    return this.userCredentialRepo.findById(payload.id);
  }

  public async createToken(
    jwtPayload: JwtPayloadInterface,
  ): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync(jwtPayload, {
        expiresIn: this.configService.get('JWT_TOKEN_EXPIRES_IN'),
      }),
    };
  }

  public decodeToken(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
