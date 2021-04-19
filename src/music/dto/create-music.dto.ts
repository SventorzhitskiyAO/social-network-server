import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  text: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  artist: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  title: string;

  @ApiProperty()
  @IsString()
  user: string;
}
