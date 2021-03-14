import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersGuards } from '../shared/guards/users.guards';
import { UserDto } from '../users/dto/user.dto';
import { AuthServices } from './auth.services';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthServices) {}

  @Get()
  @UseGuards(UsersGuards)
  @ApiResponse({
    status: 200,
    description: 'Get user on token',
    type: [UserDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  getUserByToken(@Req() request): UserDto {
    return request.user;
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Get users and token',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({ type: LoginDto })
  login(@Body() loginBody): Promise<LoginDto> {
    return this.service.login(loginBody);
  }
}
