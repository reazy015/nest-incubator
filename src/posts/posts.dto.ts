import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

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

export class CreateCommentDto {
  @IsNotEmpty({
    message: 'Comment content can no be empty',
  })
  @MaxLength(300, { message: 'Max comment length 300 symbols' })
  @MinLength(20, { message: 'Min comment length 20 symbols' })
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

  @Transform(({ value }: { value: string }) => Number(value || 1))
  @IsOptional()
  pageNumber: number = 1;

  @Transform(({ value }: { value: string }) => Number(value || 1))
  @IsOptional()
  pageSize: number = 10;
}
