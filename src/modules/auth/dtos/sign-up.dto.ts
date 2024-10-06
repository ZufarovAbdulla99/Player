import { ApiProperty } from "@nestjs/swagger";
import { ISignUpRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto implements ISignUpRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}