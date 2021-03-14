import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UserRoles } from '../constants/users-role.enum';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    if (!roles) {
      return true;
    }

    if (await this.checkJWT(request)) {
      if (!roles || roles.length === 0) {
        return true;
      }
      const user = request.user;
      return RolesGuard.matchRoles(roles, user.role);
    }
    return false;
  }

  private static matchRoles(roles: string[], userRole): boolean {
    switch (userRole) {
      case UserRoles.Admin:
        return true;
      case UserRoles.User:
        return roles.includes(UserRoles.User);
      default:
        return false;
    }
  }

  async checkJWT(req): Promise<boolean> {
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
