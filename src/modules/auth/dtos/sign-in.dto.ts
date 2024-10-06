import { ApiProperty } from "@nestjs/swagger";
import { ISignInRequest } from "../interfaces";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto implements ISignInRequest {
    @ApiProperty({
        type: String,
        required: true,
        example: "your_username"
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        type: String,
        required: true,
        example: "your_password"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}