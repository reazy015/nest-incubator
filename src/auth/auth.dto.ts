import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Can not be empty' })
  @Transform(({ value }: { value: string }) => value.trim())
  loginOrEmail: string;

  @IsNotEmpty({ message: 'Can not be empty' })
  @Transform(({ value }: { value: string }) => value.trim())
  password: string;
}
