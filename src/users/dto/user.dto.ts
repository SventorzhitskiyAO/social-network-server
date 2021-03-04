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
}
