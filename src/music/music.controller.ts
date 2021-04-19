import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import { MusicService } from './music.service';
import { Music } from '../schemas/music.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageFactory } from '../shared/mullter/storage.factory';
import { CreateMusicDto } from './dto/create-music.dto';
import {PostDto} from "../post/dto/post.dto";
import {MusicDto} from "./dto/music.dto";

@Controller('music')
@ApiTags('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [MusicDto],
  })
  getAll(): Promise<Music[]> {
    return this.musicService.getAll();
  }

  @Get('id')
  @ApiResponse({
    status: 200,
    type: [MusicDto],
  })
  getUserSong(@Param('id') id: string): Promise<Music[]> {
    return this.musicService.getUserSongs(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: [CreateMusicDto],
  })
  @UseInterceptors(
    FileInterceptor('music', {
      storage: storageFactory('users-musics'),
    }),
  )
  create(@Body() body: CreateMusicDto, @UploadedFile() file): Promise<Music> {
    console.log(file);
    body.title = file.originalname;
    console.log(process.env.PATH_TO_SERVER);
    body.path = process.env.PATH_TO_SERVER + file.path;
    return this.musicService.create(body);
  }

  @Delete('id')
  @ApiResponse({
    status: 200,
    type: [MusicDto],
  })
  remove(@Param('id') id: string): Promise<Music> {
    return this.musicService.remove(id);
  }
}
