import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({
    message: 'Post name can not be empty',
  })
  @MaxLength(30)
  title: string;

  @IsNotEmpty({
    message: 'Post description can not be empty',
  })
  @MaxLength(100)
  shortDescription: string;

  @IsNotEmpty({
    message: 'Post url can not be empty',
  })
  @MaxLength(1000)
  content: string;
}

type SortDir = 'asc' | 'desc';

export class GetPostsQueryDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  sortBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: `Can be only 'asc' or 'desc' or empty`,
  })
  sortDirection: SortDir = 'desc';

  @IsOptional()
  @Min(1)
  pageNumber: number = 1;

  @IsOptional()
  @Min(10)
  pageSize: number = 10;
}
