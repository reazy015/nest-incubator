import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/users.dto';
import { User, UserDocument } from 'src/users/users.schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerNewUser(newUser: CreateUserDto): Promise<boolean> {
    const { password, login, email } = newUser;

    const emailExists = await this.userModel.findOne({ email });

    if (emailExists) {
      throw new BadRequestException({
        field: 'email',
        message: 'Email already in use',
      });
    }
    const loginExists = await this.userModel.findOne({ login });

    if (loginExists) {
      throw new BadRequestException({
        field: 'login',
        message: 'Login already in use',
      });
    }

    const confirmationCode = this.cryptoService.getConfirmationCode();
    const { hash, salt } = await this.cryptoService.getHash(password);
    const newUnconfirmedUser = new this.userModel({
      login,
      email,
      hash,
      salt,
      confirmationCode,
    });

    const mailSent = await this.mailService.sendConfimationEmail(
      email,
      confirmationCode,
    );

    if (!mailSent) {
      throw new Error('On mail sent error occured');
    }

    await newUnconfirmedUser.save();

    return true;
  }

  async resendRegistrationEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException({
        field: 'email',
        message: 'No user with this email',
      });
    }

    if (user.confirmed) {
      throw new BadRequestException({
        field: 'email',
        message: 'Already confirmed',
      });
    }

    const newConfirmationCode = this.cryptoService.getConfirmationCode();

    const mailSent = await this.mailService.sendConfimationEmail(
      email,
      newConfirmationCode,
    );

    if (!mailSent) {
      throw new Error('On mail sent error occured');
    }

    user.confirmationCode = newConfirmationCode;
    await user.save();

    return true;
  }

  async confirmUser(confirmationCode: string): Promise<boolean> {
    const user = await this.userModel.findOne({ confirmationCode });

    if (!user) {
      throw new BadRequestException({
        field: 'code',
        message: 'Invalid code',
      });
    }

    if (user.confirmed) {
      throw new BadRequestException({
        field: 'code',
        message: 'User already confirmed',
      });
    }

    user.confirmed = true;
    await user.save();

    return true;
  }

  async validateUser(
    loginOrEmail: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isValidPassword = await this.cryptoService.validatePasswordHash(
      password,
      user.hash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: { login: string; email: string; userId: string }) {
    return {
      accessToken: this.jwtService.sign(user),
      refreshToken: this.jwtService.sign(user),
    };
  }
}
