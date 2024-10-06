import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: `Login qilish:
        Username: your_username,
        Password: your_password,`,
    description: `Login qilish username va password bilan`,
  })
  @Post('/login')
  async signIn(@Body() signInPayload: SignInDto) {
    return await this.authService.signIn(signInPayload);
  }

  @ApiOperation({
    summary: `Ro'yhatdan o'tish:
        Username: your_username,
        Password: your_password,
        Email: your_email`,
    description: `Ro'yhatdan o'tish username, password va email bilan`,
  })
  @Post('/registration')
  async signUp(@Body() signUpPayload: SignUpDto) {
    return await this.authService.signUp(signUpPayload);
  }
}
