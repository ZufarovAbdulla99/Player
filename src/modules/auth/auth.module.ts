import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [AuthService, ConfigService, JwtService],
    controllers: [AuthController]
})
export class AuthModule{}