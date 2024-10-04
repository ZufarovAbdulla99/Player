import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICreateUserRequest } from '../interfaces';

export class CreateUserDto implements ICreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  image: any;

  @IsNotEmpty()
  role: 'user' | 'admin';
}
