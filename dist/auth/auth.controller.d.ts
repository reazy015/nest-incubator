import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { EmailDto } from 'src/auth/auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerNewUser(newUser: CreateUserDto): Promise<boolean>;
    confirmRegistration(body: {
        code: string;
    }): Promise<boolean>;
    loginUser(req: any, res: Response): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): Promise<any>;
    resendRegistrationEmail(body: EmailDto): Promise<void>;
}
