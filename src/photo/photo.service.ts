import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo, PhotoDocument } from '../schemas/photo.schema';
import { Model } from 'mongoose';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
  ) {}

  async getAllPhoto(id): Promise<any> {
    return this.photoModel
      .find({
        user: id,
      })
      .exec();
  }

  async addNewPhoto(photo: any): Promise<any> {
    const newPhoto = new this.photoModel(photo);
    return newPhoto.save();
  }

  async remove(id: string): Promise<any> {
    return this.photoModel.findByIdAndDelete(id);
  }
}
