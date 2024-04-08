export declare class CreatePostDto {
    title: string;
    shortDescription: string;
    content: string;
}
export declare class CreateCommentDto {
    content: string;
}
type SortDir = 'asc' | 'desc';
export declare class GetPostsQueryDto {
    sortBy: string;
    sortDirection: SortDir;
    pageNumber: number;
    pageSize: number;
}
export {};
