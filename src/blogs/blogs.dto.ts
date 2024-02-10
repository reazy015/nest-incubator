import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({
    message: 'Blog name can not be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'Blog description can not be empty',
  })
  description: string;

  @IsNotEmpty({
    message: 'Blog url can not be empty',
  })
  websiteUrl: string;
}

type SortDir = 'asc' | 'desc';

export class GetBlogsQueryDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchNameTerm: string = '';

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  sortBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: `Can be only 'asc' or 'desc' or empty`,
  })
  sortDirection: SortDir = 'desc';

  @Transform(({ value }: { value: string }) => Number(value))
  // @IsNumberString()
  @IsOptional()
  pageNumber: number = 1;

  @Transform(({ value }: { value: string }) => Number(value))
  // @IsNumberString()
  @IsOptional()
  pageSize: number = 10;
}
