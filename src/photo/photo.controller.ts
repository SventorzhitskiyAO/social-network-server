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
import { PhotoService } from './photo.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageFactory } from '../shared/mullter/storage.factory';

@Controller('photo')
@ApiTags('post')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':id')
  getAllPhoto(@Param('id') id: string): any {
    return this.photoService.getAllPhoto(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageFactory('user-photo'),
    }),
  )
  create(@Body() body: any, @UploadedFile() file): any {
    body.path = process.env.PATH_TO_SERVER + file.path;
    return this.photoService.addNewPhoto(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.photoService.remove(id);
  }
}
