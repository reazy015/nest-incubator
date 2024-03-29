/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { CreateUserDto, GetUsersQueryDto } from 'src/users/users.dto';
import { User, UserDocument } from 'src/users/users.schema';
export declare class UsersService {
    private readonly userModel;
    private readonly cryptoService;
    constructor(userModel: Model<UserDocument>, cryptoService: CryptoService);
    getUsers(query: GetUsersQueryDto): Promise<UserDocument[]>;
    createUser(body: CreateUserDto): Promise<UserDocument>;
    createNewUnconfirmedUser(user: User): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getUsersCount(searchLoginTerm?: string, searchEmailTerm?: string): Promise<number>;
    deleteUserById(id: string): Promise<boolean>;
    deleteAllUsers(): Promise<boolean>;
}
