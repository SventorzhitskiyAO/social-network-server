import { IsString, MaxLength, MinLength } from 'class-validator';
import { Matches } from 'class-validator';
import { Match } from '../../shared/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  login: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/[a-zA-Z0-9]{3,30}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Match('password')
  passwordConfirm: string;
}
