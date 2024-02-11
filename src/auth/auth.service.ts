import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { CreateUserDto } from 'src/users/users.dto';
import { User, UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async registerNewUser(newUser: CreateUserDto): Promise<boolean> {
    const { password, login, email } = newUser;
    // const confirmationCode = this.cryptoService.getConfirmationCode();
    const { hash, salt } = await this.cryptoService.getHash(password);
    // const createdAt = new Date().toISOString();
    // const expiresIn = new Date(
    //   new Date().setMinutes(new Date().getMinutes() + 5),
    // ).toISOString();

    const newUnconfirmedUser = new this.userModel({
      login,
      email,
      hash,
      salt,
    });

    await newUnconfirmedUser.save();

    return true;

    // const addNewNoneConfirmedUser =
    //   await thi.createNoneConfirmedUser({
    //     login,
    //     email,
    //     createdAt,
    //     hash,
    //     salt,
    //     confirmationCode,
    //     expiresIn,
    //     confirmed: false,
    //     confirmationSentDate: createdAt,
    //   });
  }
}
