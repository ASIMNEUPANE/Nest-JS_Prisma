import { ApiProperty } from '@nestjs/swagger';
import { Blog, Category, Status, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BlogEntity implements Blog {
  constructor(partial: Partial<BlogEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @Exclude()
  description: string;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  totalWord: number;

  @ApiProperty()
  images: string;

  // Additional properties
  @Exclude()
  created_By: User;

  @ApiProperty()
  author: string;
}

export class DeleteEntity {
  @ApiProperty()
  return: 'success';
}
