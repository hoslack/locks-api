import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'birthDate' })
  birthDate: string;
}
