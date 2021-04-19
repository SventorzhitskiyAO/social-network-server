import { ApiProperty } from '@nestjs/swagger';

export class MusicDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  user: string;
}
