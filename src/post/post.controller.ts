import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostServices } from './post.services';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostServices) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: [PostDto],
  })
  get(@Param('id') id: string): Promise<PostDto[]> {
    return this.postService.getAll(id);
  }

  @Post('')
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 200,
    type: PostDto,
  })
  create(@Body() post: CreatePostDto): Promise<PostDto> {
    return this.postService.create(post);
  }

  @Delete(':id')
  @ApiBody({
    type: PostDto,
  })
  remove(@Param('id') id: string): Promise<PostDto> {
    return this.postService.remove(id);
  }
}
