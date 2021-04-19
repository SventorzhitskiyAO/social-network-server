import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from '../schemas/friend.schema';
import { User, UserDocument } from '../schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(id): Promise<any> {
    return this.friendModel
      .aggregate([
        {
          $match: {
            $or: [
              { user: mongoose.Types.ObjectId(id) },
              { userTwo: mongoose.Types.ObjectId(id) },
            ],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'friend',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userTwo',
            foreignField: '_id',
            as: 'friendTwo',
          },
        },
      ])
      .exec();
  }

  async create(body): Promise<any> {
    const friend = await this.friendModel.findOne({
      $or: [
        { $and: [{ user: body.user }, { userTwo: body.userTwo }] },
        { $and: [{ user: body.userTwo }, { userTwo: body.user }] },
      ],
    });

    if (!!friend) {
      return this.friendModel.findByIdAndUpdate(
        friend._id,
        { $set: { follow: true } },
        { new: true },
      );
    } else if (!friend) {
      const newFriendship = new this.friendModel(body);
      return newFriendship.save();
    }
  }
}
