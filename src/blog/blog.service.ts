import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';
import { BlogEntity } from './entities/blog.entity';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  // async create(createBlogDto: CreateBlogDto) {
  //   return await this.prisma.blog.create({ data: createBlogDto  });
  // }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
