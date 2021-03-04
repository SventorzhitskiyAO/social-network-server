import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersGuards implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      return this.checkJWT(request, context);
    } catch (e) {
      return false;
    }
  }

  async checkJWT(req, context): Promise<boolean> {
    if (!req.headers['authorization']) {
      return false;
    }
    try {
      const jwtSecret = this.configService.get('JWT_SECRET');
      const token = req.headers['authorization']
        .toString()
        .replace('Bearer ', '');
      const userInfo = jwt.verify(token, jwtSecret);

      if (userInfo) {
        const user = await this.userModel
          .findOne({ login: userInfo.login })
          .exec();
        context.switchToHttp().getRequest().user = user;
        if (user) {
          req.user = user;
          return true;
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}
