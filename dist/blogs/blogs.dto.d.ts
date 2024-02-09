export declare class CreateBlogDto {
    name: string;
    description: string;
    websiteUrl: string;
}
type SortDir = 'asc' | 'desc';
export declare class GetBlogsQueryDto {
    searchNameTerm: string;
    sortBy: string;
    sortDirection: SortDir;
    pageNumber: number;
    pageSize: number;
}
export {};
