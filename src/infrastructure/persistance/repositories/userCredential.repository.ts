import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import { Roles } from '../../../core/app/users/enums/roles.enum';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../graphql.schema.generated';
import {
  UserCredential,
  UserCredentialWhereInput,
  UserCredentialOrderByInput,
} from '../../../../generated/prisma-client';

@Injectable()
export class UserCredentialRepository implements IRepository<IUserCredential> {
  constructor(private readonly prisma: PrismaService) {}

  async insert(entity: IUserCredential): Promise<IUserCredential> {
    const allRoles: Role[] = await this.prisma.client.roles();
    const roles: Array<{ id: string }> = [];
    entity.roles.forEach((role: string) => {
      const neededRoles: Role[] = allRoles.filter(
        (dbRole: Role): boolean => dbRole.name === role,
      );
      if (neededRoles.length > 0) {
        roles.push({ id: neededRoles[0].id });
      }
    });
    const result: UserCredential = await this.prisma.client.createUserCredential(
      Object.assign({}, entity, { roles: { connect: roles } }),
    );
    return {
      id: result.id,
      email: result.email,
      isActive: result.isActive,
      profileImageUrl: result.profileImageUrl,
      roles: entity.roles,
    };
  }

  async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<IUserCredential>,
    searchCriteria: Criteria<IUserCredential>,
  ): Promise<IUserCredential[]> {
    const queryData: {
      where?: UserCredentialWhereInput;
      orderBy?: UserCredentialOrderByInput;
      skip?: number;
      after?: string;
      before?: string;
      first?: number;
      last?: number;
    } = {
      first: perPage,
      skip: (page - 1) * perPage,
    };
    if (Object.keys(orderBy).length > 0) {
      queryData.orderBy = `${Object.keys(orderBy)[0]}_${
        orderBy[Object.keys(orderBy)[0]]
      }` as UserCredentialOrderByInput;
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    const result: UserCredential[] = await this.prisma.client.userCredentials(
      queryData,
    );
    return Promise.all(
      result.map(
        async (user: UserCredential): Promise<IUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          roles: (
            await this.prisma.client.userCredential({ id: user.id }).roles()
          ).map((role: Role): Roles => role.name as Roles),
        }),
      ),
    );
  }

  async findById(id: string): Promise<IUserCredential> {
    const result: UserCredential = await this.prisma.client.userCredential({
      id,
    });
    return {
      id: result.id,
      email: result.email,
      isActive: result.isActive,
      profileImageUrl: result.profileImageUrl,
      roles: (
        await this.prisma.client.userCredential({ id: result.id }).roles()
      ).map((role: Role): Roles => role.name as Roles),
    };
  }

  async findOneByAndCriteria(
    searchCriteria: Criteria<IUserCredential>,
  ): Promise<IUserCredential> {
    const result: UserCredential[] = await this.findByAndCriteria(
      searchCriteria,
    );
    return result.length > 0
      ? {
          id: result[0].id,
          email: result[0].email,
          isActive: result[0].isActive,
          profileImageUrl: result[0].profileImageUrl,
          roles: (
            await this.prisma.client
              .userCredential({ id: result[0].id })
              .roles()
          ).map((role: Role): Roles => role.name as Roles),
        }
      : null;
  }

  async findByAndCriteria(
    searchCriteria: Criteria<IUserCredential>,
  ): Promise<IUserCredential[]> {
    const queryData: {
      where?: UserCredentialWhereInput;
    } = {};
    Object.keys(searchCriteria).forEach((key: string) => {
      queryData.where[key] = searchCriteria[key];
    });
    const result: UserCredential[] = await this.prisma.client.userCredentials(
      queryData,
    );
    return Promise.all(
      result.map(
        async (user: UserCredential): Promise<IUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          roles: (
            await this.prisma.client.userCredential({ id: user.id }).roles()
          ).map((role: Role): Roles => role.name as Roles),
        }),
      ),
    );
  }

  async findByOrCriteria(
    searchCriteria: Criteria<IUserCredential>,
  ): Promise<IUserCredential[]> {
    const queryData: {
      where?: UserCredentialWhereInput;
    } = {};
    Object.keys(searchCriteria).reduce(
      (
        acc: UserCredentialWhereInput,
        key: string,
      ): UserCredentialWhereInput => {
        let temp: UserCredentialWhereInput = acc;
        while (temp.OR !== undefined) {
          temp = temp.OR as UserCredentialWhereInput;
        }
        temp.OR = {};
        temp.OR[key] = searchCriteria[key];
        return acc;
      },
      {},
    );
    const result: UserCredential[] = await this.prisma.client.userCredentials(
      queryData,
    );
    return Promise.all(
      result.map(
        async (user: UserCredential): Promise<IUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          roles: (
            await this.prisma.client.userCredential({ id: user.id }).roles()
          ).map((role: Role): Roles => role.name as Roles),
        }),
      ),
    );
  }

  update(updateData: Criteria<IUserCredential>, id: string): Promise<any> {
    return this.prisma.client.updateUserCredential({
      data: updateData,
      where: { id },
    });
  }

  async delete(deleteCriteria: Criteria<IUserCredential>): Promise<any> {
    const usersForDelete: IUserCredential[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    return Promise.all(
      usersForDelete.map(
        (user: IUserCredential): Promise<UserCredential> =>
          this.prisma.client.deleteUserCredential({ id: user.id }),
      ),
    );
  }

  getRelatedEntity(
    id: string,
    fieldName: keyof IUserCredential,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have object type`);
  }

  getRelatedEntities(
    id: string,
    fieldName: keyof IUserCredential,
  ): Promise<Role[]> {
    if (fieldName !== 'roles') {
      throw new Error(`${fieldName} of class doesn't have array type`);
    }
    return this.prisma.client.userCredential({ id }).roles();
  }
}
