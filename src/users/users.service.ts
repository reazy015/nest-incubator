import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { CreateUserDto, GetUsersQueryDto } from 'src/users/users.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async getUsers(query: GetUsersQueryDto): Promise<UserDocument[]> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchEmailTerm,
      searchLoginTerm,
    } = query;

    const filter = {
      $or: [
        { login: { $regex: searchLoginTerm, $options: 'i' } },
        { email: { $regex: searchEmailTerm, $options: 'i' } },
      ],
    };

    const users = await this.userModel
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(+pageSize * (+pageNumber - 1))
      .limit(+pageSize)
      .exec();

    return users;
  }

  async createUser(body: CreateUserDto): Promise<UserDocument> {
    const { hash, salt } = await this.cryptoService.getHash(body.password);

    const createdUser = new this.userModel({
      ...body,
      confirmed: true,
      confirmationCode: 'created_by_admin',
      hash,
      salt,
    });

    return await createdUser.save();
  }

  async createNewUnconfirmedUser(user: User) {
    const createdUnconfirmedUser = new this.userModel(user);

    return await createdUnconfirmedUser.save();
  }

  async getUsersCount(
    searchLoginTerm?: string,
    searchEmailTerm?: string,
  ): Promise<number> {
    const filter = {
      $or: [
        { login: { $regex: searchLoginTerm, $options: 'i' } },
        { email: { $regex: searchEmailTerm, $options: 'i' } },
      ],
    };

    const totalUsersCount = await this.userModel.countDocuments(filter);

    return totalUsersCount;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      throw new HttpException(
        {
          errorMessage: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return Boolean(deletedUser);
  }

  async deleteAllUsers(): Promise<boolean> {
    return (await this.userModel.deleteMany()).acknowledged;
  }
}
