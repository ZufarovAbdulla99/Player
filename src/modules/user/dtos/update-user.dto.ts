import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUpdateUserRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Omit<IUpdateUserRequest, 'id'> {
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'your_username',
    minLength: 4,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'your_password',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'your_email',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: File,
    required: false,
    nullable: true,
  })
  image: any;

  @ApiProperty({
    type: String,
    required: false,
    example: 'user or admin',
    default: 'user',
  })
  @IsOptional()
  role: 'user' | 'admin';
}