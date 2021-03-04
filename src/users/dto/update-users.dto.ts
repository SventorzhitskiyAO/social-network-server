import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  login: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(20)
  @MinLength(3)
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  firstName?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  secondName?: string;

  @ApiProperty({
    required: false,
  })
  avatar?: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/[a-zA-Z0-9]{3,30}$/, {
    message: 'password too weak',
  })
  password?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @Match('password')
  passwordConfirm?: string;
}
