import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Can not be empty' })
  @Transform(({ value }: { value: string }) => value.trim())
  loginOrEmail: string;

  @IsNotEmpty({ message: 'Can not be empty' })
  @Transform(({ value }: { value: string }) => value.trim())
  password: string;
}

export class EmailDto {
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'Email can not be empty' })
  email: string;
}
