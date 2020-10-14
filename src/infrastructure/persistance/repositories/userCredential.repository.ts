import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import { Roles } from '../../../core/app/users/enums/roles.enum';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../graphql.schema.generated';
import ISecuredUserCredential from '../entities/securedUserCredential';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import {
  FindManyuser_credentialsArgs,
  users_to_roles,
  users_to_rolesCreateWithoutUser_credentialsInput,
  user_credentialsOrderByInput,
  user_credentialsWhereInput,
} from '@prisma/client';

@Injectable()
export default class UserCredentialRepository
  implements IRepository<ISecuredUserCredential> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(
    entity: ISecuredUserCredential,
  ): Promise<ISecuredUserCredential> {
    const allRoles: Role[] = await this.prisma.roles.findMany();
    const rolesToConnect: Array<users_to_rolesCreateWithoutUser_credentialsInput> = [];
    entity.roles.forEach((role: string): void => {
      const neededRoles: Role[] = allRoles.filter(
        (dbRole: Role): boolean => dbRole.name === role,
      );
      if (neededRoles.length > 0) {
        rolesToConnect.push({ roles: { connect: { id: neededRoles[0].id } } });
      }
    });
    const { id, roles, ...preparedEntity } = entity;
    const result = await this.prisma.user_credentials.create({
      data: Object.assign({}, preparedEntity, {
        users_to_roles: { create: rolesToConnect },
      }),
    });
    return {
      id: result.id,
      email: result.email,
      isActive: result.isActive,
      profileImageUrl: result.profileImageUrl,
      roles: entity.roles,
      passwordHash: entity.passwordHash,
    };
  }

  public async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ISecuredUserCredential>,
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
    const queryData: FindManyuser_credentialsArgs = {
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: [],
    };
    if (Object.keys(orderBy).length > 0) {
      (queryData.orderBy as user_credentialsOrderByInput[]).push(
        ...Object.keys(orderBy).map(
          (orderKey: string): user_credentialsOrderByInput => ({
            [`${orderKey}`]: (orderBy[`${orderKey}`] as
              | 'ASC'
              | 'DESC').toLowerCase(),
          }),
        ),
      );
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string): void => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    const users = await this.prisma.user_credentials.findMany(queryData);
    const result: ISecuredUserCredential[] = [];
    for await (const user of users) {
      result.push({
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        profileImageUrl: user.profileImageUrl,
        passwordHash: user.passwordHash,
        roles: (await this.getRelatedEntities(user.id, 'roles')).map(
          (role: Role): Roles => role.name as Roles,
        ),
      });
    }
    return result;
  }

  public async findById(id: string): Promise<ISecuredUserCredential> {
    const result = await this.prisma.user_credentials.findOne({
      where: { id },
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

  public async findOneByAndCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential> {
    const result = await this.findByAndCriteria(searchCriteria);
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

  public async findByAndCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
    const queryData: {
      where: user_credentialsWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      queryData.where[key] = searchCriteria[key];
    });
    const users = await this.prisma.user_credentials.findMany(queryData);
    const result: ISecuredUserCredential[] = [];
    for await (const user of users) {
      result.push({
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        profileImageUrl: user.profileImageUrl,
        passwordHash: user.passwordHash,
        roles: (await this.getRelatedEntities(user.id, 'roles')).map(
          (role: Role): Roles => role.name as Roles,
        ),
      });
    }
    return result;
  }

  public async findByOrCriteria(
    searchCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<ISecuredUserCredential[]> {
    const queryData: {
      where?: user_credentialsWhereInput;
    } = { where: { OR: [] } };
    Object.keys(searchCriteria).reduce(
      (
        acc: user_credentialsWhereInput,
        key: string,
      ): user_credentialsWhereInput => {
        acc.OR.push({
          [`${key}`]: searchCriteria[key],
        });
        return acc;
      },
      {},
    );
    const users = await this.prisma.user_credentials.findMany(queryData);
    const result: ISecuredUserCredential[] = [];
    for await (const user of users) {
      result.push({
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        profileImageUrl: user.profileImageUrl,
        passwordHash: user.passwordHash,
        roles: (await this.getRelatedEntities(user.id, 'roles')).map(
          (role: Role): Roles => role.name as Roles,
        ),
      });
    }
    return result;
  }

  public async update(
    updateData: Criteria<ISecuredUserCredential>,
    id: string,
  ): Promise<IUserCredential> {
    const { roles, ...preparedUpdateData } = updateData;
    const result = await this.prisma.user_credentials.update({
      data: preparedUpdateData,
      where: { id },
    });
    return {
      ...result,
      profileImageUrl: result.profileImageUrl ?? null,
      roles: (await this.getRelatedEntities(result.id, 'roles')).map(
        (role: Role): Roles => role.name as Roles,
      ),
    };
  }

  public async delete(
    deleteCriteria: Criteria<ISecuredUserCredential>,
  ): Promise<IUserCredential[]> {
    const usersForDelete: ISecuredUserCredential[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    const { range, ...criteria } = deleteCriteria;
    await this.prisma.users_to_roles.deleteMany({
      where: {
        userId: {
          in: usersForDelete.map(u => u.id),
        },
      },
    });
    await this.prisma.user_credentials.deleteMany({ where: criteria });
    return usersForDelete;
  }

  public getRelatedEntity(
    _id: string,
    fieldName: keyof ISecuredUserCredential,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have object type`);
  }

  public async getRelatedEntities(
    id: string,
    fieldName: keyof ISecuredUserCredential,
  ): Promise<Role[]> {
    if (fieldName !== 'roles') {
      throw new Error(`${fieldName} of class doesn't have array type`);
    }
    const allRoles = await this.prisma.roles.findMany();
    return (
      await this.prisma.user_credentials
        .findOne({ where: { id } })
        .users_to_roles()
    ).map(
      (relation: users_to_roles): Role =>
        allRoles.filter(role => role.id === relation.roleId)[0],
    );
  }
}
