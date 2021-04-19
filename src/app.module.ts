import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MusicModule } from './music/music.module';
import { AppGateway } from './app.gateway';
import { PhotoModule } from './photo/photo.module';
import { AlbumModule } from './album/album.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    AuthModule,
    UsersModule,
    PostModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/`),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FriendModule,
    MusicModule,
    PhotoModule,
    AlbumModule,
    DialogModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
