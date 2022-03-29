import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
