import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../user';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from './interfaces';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(ConfigService) private config: ConfigService,
    @Inject(JwtService) private jwt: JwtService,
  ) {}

  async signIn(payload: ISignInRequest): Promise<ISignInResponse> {
    const foundedUser = await this.userModel.findOne({
      where: { username: payload.username },
    });

    if (!foundedUser) {
      throw new BadRequestException('Invalid username or password');
    }

    const isCorrectPassword = compare(payload.password, foundedUser.password);

    if (!isCorrectPassword) {
      throw new BadRequestException('Invalid username or password');
    }

    const tokenPayload = {
      id: foundedUser.id,
      role: foundedUser.role,
    };

    const [access_token, refresh_token] = await Promise.all([
      await this.jwt.signAsync(tokenPayload, {
        privateKey: this.config.get<string>('jwt.accessKey'),
        expiresIn: this.config.get<string>('jwt.accessTime'),
      }),
      await this.jwt.signAsync(tokenPayload, {
        privateKey: this.config.get<string>('jwt.refreshKey'),
        expiresIn: this.config.get<string>('jwt.refreshTime'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(payload: ISignUpRequest): Promise<ISignUpResponse | void> {
    const existUsername = await this.userModel.findOne({
      where: {
        username: payload.username,
      },
    });
    if (existUsername) {
      throw new BadRequestException(
        `This username ${payload.username} already in use`,
      );
    }

    const existEmail = await this.userModel.findOne({
      where: {
        email: payload.email,
      },
    });
    if (existEmail) {
      throw new BadRequestException(
        `This email ${payload.email} already in use`,
      );
    }

    const hashedPassword = await hash(payload.password, 12);

    const newUser = await this.userModel.create({
      username: payload.username,
      password: hashedPassword,
      email: payload.email,
    });

    const tokenPayload = {
      id: newUser.id,
      role: newUser.role,
    };

    const [access_token, refresh_token] = await Promise.all([
      await this.jwt.signAsync(tokenPayload, {
        privateKey: this.config.get<string>('jwt.accessKey'),
        expiresIn: this.config.get<string>('jwt.accessTime'),
      }),
      await this.jwt.signAsync(tokenPayload, {
        privateKey: this.config.get<string>('jwt.refreshKey'),
        expiresIn: this.config.get<string>('jwt.refreshTime'),
      }),
    ]);

    return {
        access_token,
        refresh_token,
    }
  }
}
