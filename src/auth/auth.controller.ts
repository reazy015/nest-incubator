import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/registration')
  @HttpCode(HttpStatus.OK)
  async registerNewUser(@Body() newUser: CreateUserDto) {
    const registered = await this.authService.registerNewUser(newUser);

    return registered;
  }
}
