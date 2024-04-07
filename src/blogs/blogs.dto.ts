import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateBlogDto {
  @Transform(({ value }) => value?.trim())
  @MaxLength(15)
  @IsNotEmpty({
    message: 'Blog name can not be empty',
  })
  name: string;

  @Transform(({ value }) => value?.trim())
  @MaxLength(500)
  @IsNotEmpty({
    message: 'Blog description can not be empty',
  })
  description: string;

  @MaxLength(100)
  @IsUrl(undefined, { message: 'websiteUrl is not valid.' })
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

  // @IsInt()
  @Transform(({ value }: { value: string }) => Number(value || 1))
  // @IsString()
  // @IsNumberString()
  // @IsNotEmpty()
  // @IsOptional()
  pageNumber: number = 1;

  @Transform(({ value }: { value: string }) => Number(value || 1))
  // @IsNumberString()
  pageSize: number = 10;
}
