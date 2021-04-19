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
import { FileInterceptor } from '@nestjs/platform-express';
import { storageFactory } from '../shared/mullter/storage.factory';

import { UsersService } from './users.services';
import { User } from '../schemas/user.schema';
import { Roles } from '../shared/decorators/roles.decorators';
import { UserRoles } from '../shared/constants/users-role.enum';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
    type: UserDto,
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
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id')
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageFactory('users-avatar'),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUsersDto,
    @UploadedFile() file,
  ): Promise<User> {
    if (file) {
      updateUser.avatar = file.path;
    }
    return this.usersService.update(id, updateUser);
  }

  @Post('/userName')
  @ApiBody({
    type: LoginUserDto,
  })
  getUserLogin(@Body() login: LoginUserDto) {
    return this.usersService.getByLogin(login);
  }
}
