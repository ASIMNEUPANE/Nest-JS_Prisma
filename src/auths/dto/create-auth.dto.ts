import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full Name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john@doe.com',
  })
  email: string;

  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Password of the user',
    example: 'Hellworld@2',
  })
  password: string;

   @IsOptional()
  images?:string
}
