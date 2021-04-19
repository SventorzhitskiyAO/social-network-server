import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostServices {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getAll(id): Promise<PostDto[]> {
    return this.postModel
      .find({
        user: id,
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(post: CreatePostDto): Promise<PostDto> {
    const newUser = new this.postModel(post);
    return newUser.save();
  }

  async remove(id: string): Promise<PostDto> {
    return this.postModel.findByIdAndDelete(id);
  }
}
