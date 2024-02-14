import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoginDto } from 'src/auth/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @HttpCode(HttpStatus.OK)
  async registerNewUser(@Body() newUser: CreateUserDto) {
    const registered = await this.authService.registerNewUser(newUser);

    return registered;
  }

  @Post('/registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmRegistration(@Body() body: { code: string }) {
    const confirmed = await this.authService.confirmUser(body.code);

    return confirmed;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    return req.user;
  }
}
