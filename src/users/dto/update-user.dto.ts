import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'birthDate' })
  birthDate: string;
}
