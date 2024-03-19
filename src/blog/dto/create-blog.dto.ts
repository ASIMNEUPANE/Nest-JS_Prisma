import { Category, Status, User } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  description: string;

  @IsString()
  category: Category;

  @IsString()
  @IsOptional()
  status?: Status;

  @IsInt()
  totalWord: number;

  @IsString()
  @IsOptional()
  images?: string;

  
  created_By: User;

  @IsString()
  author: string;
}
