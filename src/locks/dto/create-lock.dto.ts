import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLockDto {
  @IsString()
  @ApiProperty({ type: String, description: 'macId' })
  macId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;
}
