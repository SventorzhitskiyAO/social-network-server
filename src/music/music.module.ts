import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from '../schemas/music.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
