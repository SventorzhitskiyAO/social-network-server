import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  like: number;
}
