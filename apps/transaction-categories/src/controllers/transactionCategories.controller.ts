import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  BadRequestException,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import UpdateTransactionCategoryDto from '../dtos/updateTransactionCategory.dto';
import AddTransationCategoryDto from '../dtos/addTransationCategory.dto';

import { Roles } from '@app/users/enums/roles.enum';
import TransactionCategoryInputPort from '@app/transactionCategories/ports/transactionCategotyInput.port';

import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';
import IUser from '@domain/users/entities/user.interface';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import {
  INVALID_TOKEN_MSG,
  INVALID_USER_MSG,
  TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
  USER_IS_NOT_ACTIVE_MSG,
} from '@common/constants/errorMessages.constants';

@ApiBearerAuth()
@ApiTags('Own transaction categories management')
@ApiUnauthorizedResponse({
  schema: {
    type: 'string',
    examples: [
      'Incorrect token',
      INVALID_USER_MSG,
      USER_IS_NOT_ACTIVE_MSG,
      INVALID_TOKEN_MSG,
    ],
  },
})
@ApiForbiddenResponse({
  schema: {
    type: 'string',
    example: 'This user doesn`t have any of these groups',
  },
})
@UseGuards(JwtAuthGuard)
@OnlyRoles(Roles.ADMINISTRATOR, Roles.USER)
@Controller('transactionCategories')
export default class TransactionCategoriesController {
  private readonly transactionCategoriesRepo: IRepository<ITransactionCategory>;

  constructor(
    @Inject('TransactionCategoryInputPort')
    private readonly transactionCategoriesInputPort: TransactionCategoryInputPort,
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {
    this.transactionCategoriesRepo = this.transactionCategoryFactory.createTransactionCategoryRepo();
  }

  @ApiOperation({ description: 'Get own and system top-categories' })
  @ApiOkResponse({
    description: 'categories array',
    schema: {
      type: 'array',
      items: {
        properties: {
          name: { type: 'string' },
          parentCategory: { type: 'ITransactionCategory | null' },
          isSystem: { type: 'boolean' },
          isOutcome: { type: 'boolean' },
        },
      },
    },
  })
  @Get('top-categories')
  getTopCategories(@User() user: IUser): Promise<ITransactionCategory[]> {
    return this.transactionCategoriesInputPort.getTopCategories(user);
  }

  @ApiOperation({ description: 'Get transaction category direct children' })
  @ApiOkResponse({
    description: 'categories array',
    schema: {
      type: 'array',
      items: {
        properties: {
          name: { type: 'string' },
          parentCategory: { type: 'ITransactionCategory | null' },
          isSystem: { type: 'boolean' },
          isOutcome: { type: 'boolean' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('category-direct-children/:parentCategoryId')
  async getCategoryDirectChildren(
    @User() user: IUser,
    @Param('parentCategoryId') parentCategoryId: string,
  ): Promise<ITransactionCategory[]> {
    let parentCategory: ITransactionCategory = null;
    try {
      parentCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id: parentCategoryId,
          owner: user,
        },
      );
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    return this.transactionCategoriesInputPort.getCategoryDirectChildren(
      user,
      parentCategory,
    );
  }

  @ApiOperation({ description: 'Get own transaction categories' })
  @ApiOkResponse({
    description: 'categories array',
    schema: {
      type: 'array',
      items: {
        properties: {
          name: { type: 'string' },
          parentCategory: { type: 'ITransactionCategory | null' },
          isSystem: { type: 'boolean' },
          isOutcome: { type: 'boolean' },
        },
      },
    },
  })
  @Get('own-categories')
  getOwnCategories(@User() user: IUser): Promise<ITransactionCategory[]> {
    return this.transactionCategoriesInputPort.getOwnCategories(user);
  }

  @ApiOperation({ description: 'Search transaction categories by name' })
  @ApiOkResponse({
    description: 'categories array',
    schema: {
      type: 'array',
      items: {
        properties: {
          name: { type: 'string' },
          parentCategory: { type: 'ITransactionCategory | null' },
          isSystem: { type: 'boolean' },
          isOutcome: { type: 'boolean' },
        },
      },
    },
  })
  @Get('search')
  search(
    @User() user: IUser,
    @Query('search') content: string,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoriesInputPort.search(user, content);
  }

  @ApiOperation({ description: 'Create own transaction category' })
  @ApiCreatedResponse({
    description: 'created category',
    schema: {
      properties: {
        name: { type: 'string' },
        parentCategory: { type: 'ITransactionCategory | null' },
        isSystem: { type: 'boolean' },
        isOutcome: { type: 'boolean' },
      },
    },
  })
  @Post()
  addCategory(
    @User() user: IUser,
    @Body() payload: AddTransationCategoryDto,
  ): Promise<ITransactionCategory> {
    return this.transactionCategoriesInputPort.addCategory(user, payload);
  }

  @ApiOperation({ description: 'Update own transaction category' })
  @ApiOkResponse({
    description: 'updated category',
    schema: {
      properties: {
        name: { type: 'string' },
        parentCategory: { type: 'ITransactionCategory | null' },
        isSystem: { type: 'boolean' },
        isOutcome: { type: 'boolean' },
      },
    },
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Patch(':id')
  async updateCategory(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() payload: UpdateTransactionCategoryDto,
  ): Promise<ITransactionCategory> {
    let targetCategory: ITransactionCategory = null;
    try {
      targetCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id,
          owner: user,
        },
      );
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    return this.transactionCategoriesInputPort.updateCategory(
      targetCategory,
      payload,
    );
  }

  @ApiOperation({
    description: 'Delete own transaction category (cascade deleting)',
  })
  @ApiOkResponse({
    description: 'result of deletion',
    schema: { type: 'boolean' },
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Delete(':id')
  async deleteCategory(
    @User() user: IUser,
    @Param('id') id: string,
  ): Promise<boolean> {
    let targetCategory: ITransactionCategory = null;
    try {
      targetCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id,
          owner: user,
        },
      );
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    return this.transactionCategoriesInputPort.deleteCategory(targetCategory);
  }
}
