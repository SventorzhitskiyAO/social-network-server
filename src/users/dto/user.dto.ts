import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  facebook: string;

  @ApiProperty()
  vk: string;

  @ApiProperty()
  github: string;

  @ApiProperty()
  instagram: string;

  @ApiProperty()
  skill: string;

  @ApiProperty()
  aboutMe: string;
}
