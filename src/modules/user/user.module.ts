import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./schemas";
import { UserService } from "./user.service";
import { UserController } from "./user.contoller";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule {}