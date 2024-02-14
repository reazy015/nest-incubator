import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/users.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerNewUser(newUser: CreateUserDto): Promise<boolean>;
    confirmRegistration(body: {
        code: string;
    }): Promise<boolean>;
    loginUser(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<any>;
}
