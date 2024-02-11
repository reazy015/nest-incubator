type SortDir = 'asc' | 'desc';
export declare class GetUsersQueryDto {
    searchLoginTerm: string;
    searchEmailTerm: string;
    sortBy: string;
    sortDirection: SortDir;
    pageNumber: number;
    pageSize: number;
}
export declare class CreateUserDto {
    login: string;
    password: string;
    email: string;
}
export {};
