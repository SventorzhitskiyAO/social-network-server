import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FriendDto } from './dto/friend.dto';

@Controller('friend')
@ApiTags('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Get(':id')
  @ApiResponse({
    status: 200,
    type: [FriendDto],
  })
  getAll(@Param('id') id: string): Promise<any> {
    return this.friendService.getAll(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: FriendDto,
  })
  create(@Body() body: any): Promise<any> {
    return this.friendService.create(body);
  }
}
