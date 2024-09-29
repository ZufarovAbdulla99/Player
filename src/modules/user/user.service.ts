import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./schemas";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getAllUser(): Promise<User[]> {
        return await this.userModel.findAll();
    }
}