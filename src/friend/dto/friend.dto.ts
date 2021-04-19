import { ApiProperty } from '@nestjs/swagger';

export class FriendDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  userTwo: number;

  @ApiProperty()
  follow: boolean;
}
