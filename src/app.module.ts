import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/`),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
