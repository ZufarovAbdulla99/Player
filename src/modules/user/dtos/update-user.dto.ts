import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUpdateUserRequest } from '../interfaces';

export class UpdateUserDto implements Omit<IUpdateUserRequest, 'id'> {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  image: any;

  @IsOptional()
  role: "user" | "admin";
}
