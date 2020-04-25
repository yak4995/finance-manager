import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import { Roles } from '../../../core/app/users/enums/roles.enum';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import PrismaService from '../prisma/prisma.service';
import { Role } from '../../graphql.schema.generated';
import {
  UserCredential,
  UserCredentialWhereInput,
  UserCredentialOrderByInput,
} from '../../../../generated/prisma-client';
import ISecuredUserCredential from '../entities/securedUserCredential';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';

@Injectable()
export default class UserCredentialRepository
  implements IRepository<ISecuredUserCredential> {
  constructor(private readonly prisma: PrismaService) {}

  async insert(
    entity: ISecuredUserCredential,
  ): Promise<ISecuredUserCredential> {
    const allRoles: Role[] = await this.prisma.client.roles();
    const roles: Array<{ id: string }> = [];
    entity.roles.forEach((role: string): void => {
      const neededRoles: Role[] = allRoles.filter(
        (dbRole: Role): boolean => dbRole.name === role,
      );
      if (neededRoles.length > 0) {
        roles.push({ id: neededRoles[0].id });
      }
    });
    const { id, ...preparedEntity } = entity;
    const result: UserCredential = await this.prisma.client.createUserCredential(
      Object.assign({}, preparedEntity, { roles: { connect: roles } }),
    );
    return {
      id: result.id,
      email: result.email,
      isActive: result.isActive,
      profileImageUrl: result.profileImageUrl,
      roles: entity.roles,
      passwordHash: entity.passwordHash,
    };
  }

  async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ISecuredUserCredential>,
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
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
      Object.keys(searchCriteria).forEach((key: string): void => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    const result: UserCredential[] = await this.prisma.client.userCredentials(
      queryData,
    );
    return Promise.all(
      result.map(
        async (user: UserCredential): Promise<ISecuredUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          passwordHash: user.passwordHash,
          roles: (await this.getRelatedEntities(user.id, 'roles')).map(
            (role: Role): Roles => role.name as Roles,
          ),
        }),
      ),
    );
  }

  async findById(id: string): Promise<ISecuredUserCredential> {
    const result: UserCredential = await this.prisma.client.userCredential({
      id,
    });
    return {
      id: result.id,
      email: result.email,
      isActive: result.isActive,
      profileImageUrl: result.profileImageUrl,
      passwordHash: result.passwordHash,
      roles: (await this.getRelatedEntities(result.id, 'roles')).map(
        (role: Role): Roles => role.name as Roles,
      ),
    };
  }

  async findOneByAndCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential> {
    const result: UserCredential[] = await this.findByAndCriteria(
      searchCriteria,
    );
    if (result.length > 0) {
      return {
        id: result[0].id,
        email: result[0].email,
        isActive: result[0].isActive,
        profileImageUrl: result[0].profileImageUrl,
        passwordHash: result[0].passwordHash,
        roles: (await this.getRelatedEntities(result[0].id, 'roles')).map(
          (role: Role): Roles => role.name as Roles,
        ),
      };
    } else {
      throw new Error('This user has not been found');
    }
  }

  async findByAndCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
    const queryData: {
      where: UserCredentialWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      queryData.where[key] = searchCriteria[key];
    });
    const result: UserCredential[] = await this.prisma.client.userCredentials(
      queryData,
    );
    return Promise.all(
      result.map(
        async (user: UserCredential): Promise<ISecuredUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          passwordHash: user.passwordHash,
          roles: (await this.getRelatedEntities(user.id, 'roles')).map(
            (role: Role): Roles => role.name as Roles,
          ),
        }),
      ),
    );
  }

  async findByOrCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
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
        async (user: UserCredential): Promise<ISecuredUserCredential> => ({
          id: user.id,
          email: user.email,
          isActive: user.isActive,
          profileImageUrl: user.profileImageUrl,
          passwordHash: user.passwordHash,
          roles: (await this.getRelatedEntities(user.id, 'roles')).map(
            (role: Role): Roles => role.name as Roles,
          ),
        }),
      ),
    );
  }

  async update(
    updateData: Criteria<ISecuredUserCredential>,
    id: string,
  ): Promise<IUserCredential> {
    const result: UserCredential = await this.prisma.client.updateUserCredential(
      {
        data: updateData,
        where: { id },
      },
    );
    return {
      ...result,
      profileImageUrl: result.profileImageUrl ?? null,
      roles: (await this.getRelatedEntities(result.id, 'roles')).map(
        (role: Role): Roles => role.name as Roles,
      ),
    };
  }

  async delete(
    deleteCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<IUserCredential[]> {
    const usersForDelete: ISecuredUserCredential[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    return Promise.all(
      usersForDelete.map(
        (user: ISecuredUserCredential): Promise<IUserCredential> =>
          this.prisma.client.deleteUserCredential({ id: user.id }).then(
            async (result: UserCredential): Promise<IUserCredential> => ({
              ...result,
              profileImageUrl: result.profileImageUrl ?? null,
              roles: (await this.getRelatedEntities(result.id, 'roles')).map(
                (role: Role): Roles => role.name as Roles,
              ),
            }),
          ),
      ),
    );
  }

  getRelatedEntity(
    _id: string,
    fieldName: keyof ISecuredUserCredential,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have object type`);
  }

  getRelatedEntities(
    id: string,
    fieldName: keyof ISecuredUserCredential,
  ): Promise<Role[]> {
    if (fieldName !== 'roles') {
      throw new Error(`${fieldName} of class doesn't have array type`);
    }
    return this.prisma.client.userCredential({ id }).roles();
  }
}
