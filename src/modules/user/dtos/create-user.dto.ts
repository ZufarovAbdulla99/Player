import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICreateUserRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto implements ICreateUserRequest {
  @ApiProperty({
    type: String,
    required: true,
    example: 'your_username',
    minLength: 4,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'your_password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'your_email',
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role faqat "user" yoki "admin" bo\'lishi mumkin' })
  role: Role;
}
