import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../schemas/album.schema';
import { AlbumController } from './album.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
