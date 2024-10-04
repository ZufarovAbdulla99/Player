import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { ICreateUserRequest } from "./interfaces";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async createUser(payload: ICreateUserRequest): Promise<void> {
        console.log(payload, "*")
        const hashedPassword = await hash(payload.password, 12)

        await this.userModel.create({
            username: payload.username,
            password: hashedPassword,
            email: payload.email,
            image: payload.image,
            role: payload.role,
        })
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async getUser(userId: number): Promise<User> {
        return await this.userModel.findByPk(userId)
    }
}

/*
import { join } from 'path';
import * as fs from 'fs/promises'
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { ICreateUserRequest, IUpdateUserRequest } from "./interfaces";
import { Article } from '../articles';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async create(payload: ICreateUserRequest): Promise<User> {

        const hashedPassword = await hash(payload.password, 12)

        const newUser = await this.userModel.create({
            full_name: payload.full_name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
            image: payload.image
        })

        return await this.findById(newUser.id)
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll({
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt']
            },
            include: [Article]
        });
    }

    async findById(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt']
            }
        })

        if (!user)
            throw new NotFoundException()

        return user
    }

    async updateById(payload: IUpdateUserRequest): Promise<User> {

        const user = await this.findById(payload.id)

        if (user.image)
            fs.unlink(join(__dirname, '..', '..', '..', 'uploads', user.image))

        const hashedPassword = await hash(payload.password, 12)

        await user.update({
            full_name: payload.full_name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
            image: payload.image
        })

        return await this.findById(user.id)

    }

    async deleteById(id: number): Promise<boolean> {

        const user = await this.findById(id)

        if (user.image)
            fs.unlink(join(__dirname, '..', '..', '..', 'uploads', user.image))

        await user.destroy()
        return true
    }
}*/