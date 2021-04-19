import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async getAlbums(id): Promise<any> {
    return this.albumModel
      .find({
        user: id,
      })
      .exec();
  }

  async createAlbums(al: any): Promise<any> {
    const newAlbum = new this.albumModel(al);
    return newAlbum.save();
  }

  async remove(id: string): Promise<any> {
    return this.albumModel.findByIdAndDelete(id);
  }
}
