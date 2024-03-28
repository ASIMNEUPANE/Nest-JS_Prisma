import { Category, Status, User } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full title of the blog',
    example: 'Nepal the great',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'content of the blog',
    example: 'Nepal the great',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description of the blog',
    example: 'Nepal the great',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'category of the blog',
    example: 'Nepal the great',
  })
  category: Category;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'total word of the blog',
    example: 'Nepal the great',
  })
  totalWord: number;

  @IsString()
  @ApiProperty({
    description: 'status of the blog',
    example: 'Nepal the great',
  })
  @IsOptional()
  status?: Status;

  @IsString()
  @ApiProperty({
    description: 'images of the blog',
    example: 'Nepal the great',
  })
  @IsOptional()
  images?: string;

  @IsString()
  @IsOptional()
  author: string;
}

export class GetBlogDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'title of the blog',
    example: 'Nepal the great',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'name of the author',
    example: 'asim_neupane',
  })
  author: string;
}
