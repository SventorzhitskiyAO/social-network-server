import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.services';
import { User } from '../schemas/user.schema';
import { Roles } from '../shared/decorators/roles.decorators';
import { UserRoles } from '../shared/constants/users-role.enum';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageFactory } from '../shared/mullter/storage.factory';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: [UserDto],
  })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiBody({
    type: CreateUsersDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Get new users',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  create(@Body(new ValidationPipe()) user: CreateUsersDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Roles(UserRoles.Admin, UserRoles.User)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageFactory('users-avatar'),
    }),
  )
  @ApiResponse({
    status: 201,
    description: 'Update and get new user',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({
    type: UpdateUsersDto,
  })
  update(
    @Param('id') id: string,
    @Body()
    updateUser: // new ValidationPipe()
    UpdateUsersDto,
    @UploadedFile() file,
  ) {
    return this.usersService.update(id, {
      ...updateUser,
      avatar: file.path,
    });
  }

  @Post('/userName')
  @ApiBody({
    type: LoginUserDto,
  })
  getUserLogin(@Body() login: LoginUserDto) {
    return this.usersService.getByLogin(login);
  }
}
