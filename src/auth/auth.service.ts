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

    const userExists = await this.userModel.findOne({ email });

    if (userExists) {
      throw new BadRequestException({
        field: 'email',
        message: 'Email already in use',
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

    const { hash } = await this.cryptoService.getHash(password, user.salt);
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
    };
  }
}
