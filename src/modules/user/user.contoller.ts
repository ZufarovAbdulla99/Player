import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models";
import { CreateUserDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/config/multer.config";

@Controller('user')
export class UserController {
    #_service: UserService;

    constructor(service: UserService) {
        this.#_service = service;
    }

    @Get('/')
    async getAllUsers(): Promise<User[]> {
        return await this.#_service.getAllUsers();
    }

    @Get("/:userId")
    async getUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
        return await this.#_service.getUser(userId)
    }

    @Post("/add")
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async createUser(@Body() payload: CreateUserDto, @UploadedFile() image: Express.Multer.File): Promise<void> {
        console.log(payload)
        return await this.#_service.createUser({...payload, image: image?.filename})
    }
}