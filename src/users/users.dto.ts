import { Transform } from 'class-transformer';
import { IsOptional, IsIn, Length, IsEmail } from 'class-validator';

type SortDir = 'asc' | 'desc';

export class GetUsersQueryDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchLoginTerm: string = '';

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchEmailTerm: string = '';

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

export class CreateUserDto {
  @Length(3, 10)
  login: string;

  @Length(6, 20)
  password: string;

  @IsEmail()
  email: string;
}
