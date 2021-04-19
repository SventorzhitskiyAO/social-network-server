import { Injectable } from '@nestjs/common';
import { Music, MusicDocument } from '../schemas/music.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicDto } from './dto/music.dto';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {}

  async getAll(): Promise<Music[]> {
    return this.musicModel.find().exec();
  }

  getUserSongs(id): Promise<Music[]> {
    return this.musicModel
      .find({
        user: id,
      })
      .exec();
  }

  async create(music: CreateMusicDto): Promise<Music> {
    console.log(music);
    const newMusic = new this.musicModel(music);
    return newMusic.save();
  }

  async remove(id): Promise<Music> {
    return this.musicModel.findByIdAndDelete(id);
  }
}
