import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { ICreateUserRequest, IUpdateUserRequest } from './interfaces';
import { hash } from 'bcrypt';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(payload: ICreateUserRequest): Promise<void> {
    // console.log(payload, "*")
    const hashedPassword = await hash(payload.password, 12);

    await this.userModel.create({
      username: payload.username,
      password: hashedPassword,
      email: payload.email,
      image: payload.image,
      role: payload.role,
    });
  }

  async getAllUsers(): Promise<User[] | string> {
    const selectedUsers = await this.userModel.findAll()
    // console.log(selectedUsers)
    if(!selectedUsers.length) {
        return `Any user not found`
    }
    return await this.userModel.findAll();
  }

  async getUser(userId: number): Promise<User | string> {
    const user = await this.userModel.findByPk(userId);

    if(!user) {
        return `User not found`
    }

    return await this.userModel.findByPk(userId);
  }

  async updateUser(userId: number, payload: IUpdateUserRequest): Promise<void | string> {
    const user = await this.userModel.findByPk(userId);

    // console.log(user) // // null
    if(!user) {
        return `User not found`
    }

    if (user.image)
      unlink(join(__dirname, '..', '..', '..', 'uploads', user.image), (err) => {
        if(err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas")
        }
    });

    const hashedPassword = await hash(payload.password, 12);

    await user.update({
      username: payload.username,
      password: hashedPassword,
      email: payload.email,
      image: payload.image,
      role: payload.role,
    });
  }

  async deleteUser(userId: number): Promise<void | string> {
    const selectedUser = await this.userModel.findByPk(userId)

    // console.log(selectedUser)
    if(!selectedUser){
        return `User not found can't delete`
    }

    await selectedUser.destroy()
  }

  async deleteAllUsers(): Promise<void | string> {
    const selectedUsers = await this.userModel.findAll()
    // console.log(selectedUsers)
    if(!selectedUsers.length) {
        return `Any user not found`
    }

    await this.userModel.truncate()
  }
}