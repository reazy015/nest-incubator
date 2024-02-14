import { CreateUserDto, GetUsersQueryDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(query: GetUsersQueryDto): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            login: string;
            email: string;
            createdAt: string;
        }[];
    }>;
    createUser(body: CreateUserDto): Promise<{
        id: any;
        login: string;
        email: string;
        createdAt: string;
    }>;
    deleteUser(id: string): Promise<boolean>;
}
