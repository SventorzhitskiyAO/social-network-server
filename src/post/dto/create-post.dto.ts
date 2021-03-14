import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  text: string;

  @ApiProperty()
  @IsString()
  id: string;
}
