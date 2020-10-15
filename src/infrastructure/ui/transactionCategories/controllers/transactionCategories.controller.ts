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
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import TransactionCategoryInputPort from '../../../../core/app/transactionCategories/ports/transactionCategotyInput.port';
import IUser from '../../../../core/domain/users/entities/user.interface';
import ITransactionCategory from '../../../../core/domain/transactionCategories/entities/transactionCategory.interface';
import IRepository from '../../../../core/domain/repository.interface';
import { User } from '../../../decorators/user.decorator';
import UpdateTransactionCategoryDto from '../dtos/updateTransactionCategory.dto';
import AddTransationCategoryDto from '../dtos/addTransationCategory.dto';
import TransactionCategoryAbstractFactory from '../../../../core/domain/transactionCategories/factories/transactionCategoryFactory';
import { OnlyRoles } from '../../../decorators/roles.decorator';
import { Roles } from '../../../../core/app/users/enums/roles.enum';
import JwtAuthGuard from '../../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Own transaction categories management')
@ApiUnauthorizedResponse({
  schema: {
    type: 'string',
    examples: [
      'Incorrect token',
      'User from token is invalid!',
      'User is not active!',
      'User token is invalid or expired',
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

  @ApiOperation({ description: 'Get profile info about current user' })
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
  @Get('category-direct-children/:parentCategoryId')
  async getCategoryDirectChildren(
    @User() user: IUser,
    @Param('parentCategoryId') parentCategoryId: string,
  ): Promise<ITransactionCategory[]> {
    try {
      const parentCategory: ITransactionCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id: parentCategoryId,
          owner: user,
        },
      );
      return this.transactionCategoriesInputPort.getCategoryDirectChildren(
        user,
        parentCategory,
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @ApiOperation({ description: 'Get profile info about current user' })
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

  @ApiOperation({ description: 'Get profile info about current user' })
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

  @ApiOperation({ description: 'Get profile info about current user' })
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

  @ApiOperation({ description: 'Get profile info about current user' })
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
  @Patch(':id')
  async updateCategory(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() payload: UpdateTransactionCategoryDto,
  ): Promise<ITransactionCategory> {
    try {
      const targetCategory: ITransactionCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id,
          owner: user,
        },
      );
      return this.transactionCategoriesInputPort.updateCategory(
        targetCategory,
        payload,
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @ApiOperation({ description: 'Get profile info about current user' })
  @ApiOkResponse({
    description: 'result of deletion',
    schema: { type: 'boolean' },
  })
  @Delete(':id')
  async deleteCategory(
    @User() user: IUser,
    @Param('id') id: string,
  ): Promise<boolean> {
    try {
      const targetCategory: ITransactionCategory = await this.transactionCategoriesRepo.findOneByAndCriteria(
        {
          id,
          owner: user,
        },
      );
      return this.transactionCategoriesInputPort.deleteCategory(targetCategory);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
