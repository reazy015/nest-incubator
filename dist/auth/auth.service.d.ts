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
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/users.dto';
import { UserDocument } from 'src/users/users.schema';
export declare class AuthService {
    private readonly cryptoService;
    private readonly jwtService;
    private readonly mailService;
    private readonly userModel;
    constructor(cryptoService: CryptoService, jwtService: JwtService, mailService: MailService, userModel: Model<UserDocument>);
    registerNewUser(newUser: CreateUserDto): Promise<boolean>;
    confirmUser(confirmationCode: string): Promise<boolean>;
    validateUser(loginOrEmail: string, password: string): Promise<UserDocument>;
    login(user: {
        login: string;
        email: string;
        userId: string;
    }): Promise<{
        accessToken: string;
    }>;
}
