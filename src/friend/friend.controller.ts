import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Get(':id')
  getAll(@Param('id') id: string): Promise<any> {
    return this.friendService.getAll(id);
  }

  @Post()
  create(@Body() body: any): Promise<any> {
    return this.friendService.create(body);
  }
}
