import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '../schemas/user.schema';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getByLogin(login: { login: string }): Promise<User> {
    return this.userModel.findOne(login);
  }

  async create(user: CreateUsersDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, user: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { ...user } },
      {
        new: true,
      },
    );
  }
}
