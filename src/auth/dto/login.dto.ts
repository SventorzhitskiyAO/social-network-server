import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class LoginDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
