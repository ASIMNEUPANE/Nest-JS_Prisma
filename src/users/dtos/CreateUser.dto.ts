import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  images?: string;

  @IsString()
  @IsOptional()
  roles?: Role;
}
