import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';
import { BlogEntity } from './entities/blog.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Iblog, getReturn } from './blog.type';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    return await this.prisma.blog.create({ data: createBlogDto });
  }

  async findAll(
    limit: number,
    page: number,
    search: { title?: string; author?: string },
  ): Promise<getReturn> {
    const pageNum = page || 1;
    const size = limit || 4;

    const whereCondition: any = {
      status: 'Published',
    };
    if (search.title) {
      whereCondition.title = search.title;
    }

    if (search.author) {
      whereCondition.author = search.author;
    }

    // Get total count
    const total = await this.prisma.blog.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await this.prisma.blog.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  }

  async findOne(id: number): Promise<Iblog> {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Iblog> {
    return await this.prisma.blog.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  async deleteById(id: number) {
    return await this.prisma.blog.delete({ where: { id } });
  }
}
