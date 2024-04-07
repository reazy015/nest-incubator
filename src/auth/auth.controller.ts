import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { EmailDto } from 'src/auth/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  async loginUser(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('/registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendRegistrationEmail(@Body() body: EmailDto) {
    await this.authService.resendRegistrationEmail(body.email);
  }
}
