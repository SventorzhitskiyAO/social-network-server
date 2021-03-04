import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from '../schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async login({ login, password }): Promise<LoginDto> {
    try {
      const jwtToken = this.configService.get('JWT_SECRET');
      const user = await this.checkCredentials(login, password);
      const token = jwt.sign({ login }, jwtToken);

      return { user, token };
    } catch (e) {
      throw new HttpException('Wrong login or password', 400);
    }
  }

  private async checkCredentials(
    login: string,
    password: string,
  ): Promise<UserDto> {
    let user = await this.userModel.findOne({ login: login });
    if (!user) {
      user = await this.userModel.findOne({ email: login });
    }
    const loginTrue = bcrypt.compareSync(password, user.password);
    if (loginTrue) {
      return user;
    } else {
      throw new Error('Wrong login or password');
    }
  }
}
