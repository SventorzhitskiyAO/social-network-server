import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from '../schemas/friend.schema';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
  ) {}

  async getAll(id): Promise<any> {
    return this.friendModel.find({
      $or: [{ user: id }, { userTwo: id }],
    });
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
