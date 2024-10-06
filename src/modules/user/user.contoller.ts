import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @ApiOperation({
    summary: 'Barcha userlarni olish',
    description: 'Barcha userlarni olish',
  })
  @Get('/')
  async getAllUsers(): Promise<User[] | string> {
    return await this.#_service.getAllUsers();
  }

  @ApiOperation({
    summary: 'Bitta userni olish',
    description: `Bitta userni id raqami bo'yicha olish`,
  })
  @Get('/:userId')
  async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User | string> {
    return await this.#_service.getUser(userId);
  }

  @ApiOperation({
    summary: 'Yangi user yaratish',
    description: `User yaratish username, password, email kiritilishi shart!`,
  })
  @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    // console.log(payload);
    return await this.#_service.createUser({
      ...payload,
      image: image?.filename,
    });
  }

  @ApiOperation({
    summary: 'Userni yangilash',
    description: `User yangilash username, password, email va useridsi kiritilishi shart!`,
  })
  @ApiConsumes("multipart/form-data")
  @Patch('/update/:userId')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void | string> {
    return await this.#_service.updateUser(userId, {
      ...payload,
      image: image?.filename,
    });
  }

  @ApiOperation({
    summary: "Userni o'chirish",
    description: `User id raqami bo'yicha o'chirish`,
  })
  @Delete('/delete/:userId')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void | string> {
    return await this.#_service.deleteUser(userId);
  }

  @ApiOperation({
    summary: "Barcha userlarni o'chirish",
    description: `Barcha userlarni o'chirish`,
  })
  @Delete('/delete')
  async deleteAllUsers(): Promise<void | string> {
    return await this.#_service.deleteAllUsers();
  }
}
