import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BlogService } from './blog.service';
import { Category, Status } from '@prisma/client';

const BlogArray = [
  {
    id: 1,
    title: 'nepal',
    content: 'best country',
    description: 'best in the world',
    category: Category.TECHNOLOGY,
    totalWord: 123,
    status: Status.Published,
    images: 'nepal.jpg',
    author: 'asim_neupane',
  },
  {
    id: 2,
    title: 'India',
    content: 'vibrant culture',
    description: 'rich heritage',
    category: Category.TECHNOLOGY,
    totalWord: 175,
    status: Status.Published,
    images: 'india.jpg',
    author: 'asim_neupane',
  },
  {
    id: 3,

    title: 'Italy',
    content: 'scenic beauty',
    description: 'culinary delights',
    category: Category.TECHNOLOGY,
    totalWord: 150,
    status: Status.Published,
    images: 'italy.jpg',
    author: 'asim_neupane',
  },
];

describe('BlogService', () => {
  let service: BlogService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: PrismaService,
          useValue: {
            blog: {
              create: jest.fn(),
              count: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a blog', () => {
    it('create and save blog successfully', async () => {
      jest.spyOn(prismaService.blog, 'create').mockResolvedValue(BlogArray[0]);

      const createdBlog = await service.create(BlogArray[0]);

      expect(createdBlog).toEqual(BlogArray[0]);
      expect(prismaService.blog.create).toHaveBeenCalledWith({
        data: BlogArray[0],
      });
    });

    it('handles failure in creating a blog', async () => {
      const error = new Error('Failed to create blog');
      jest.spyOn(prismaService.blog, 'create').mockRejectedValue(error);

      await expect(service.create(BlogArray[0])).rejects.toThrow(error);
      expect(prismaService.blog.create).toHaveBeenCalledWith({
        data: BlogArray[0],
      });
    });
  });
  describe('findAll', () => {
    it('should return paginated data', async () => {
      // Mock input data
      const limit = 1;
      const page = 1;
      const search = { title: 'nepal', author: 'asim_neupane' };

      // Mock PrismaService calls
      const totalCount = 3;
      const paginatedData = [BlogArray[0], BlogArray[1]];

      jest.spyOn(prismaService.blog, 'count').mockResolvedValue(totalCount);
      jest
        .spyOn(prismaService.blog, 'findMany')
        .mockResolvedValue(paginatedData);

      // Execute the method
      const result = await service.findAll(limit, page, search);
      console.log(result, '==========');
      // Verify the result
      expect(result).toEqual({
        data: paginatedData,
        total: totalCount,
        limit,
        page,
      });

      // Verify PrismaService calls
      expect(prismaService.blog.count).toHaveBeenCalledWith({
        where: {
          status: 'Published',
          title: 'nepal',
          author: 'asim_neupane',
        },
      });
      expect(prismaService.blog.findMany).toHaveBeenCalledWith({
        where: {
          status: 'Published',
          title: 'nepal',
          author: 'asim_neupane',
        },
        skip: 0,
        take: limit,
      });
    });
  });

  describe('get by id', () => {
    it('should get blog by id', async () => {
      jest
        .spyOn(prismaService.blog, 'findUnique')
        .mockResolvedValue(BlogArray[0]);
      await service.findOne(BlogArray[0].id);
      expect(prismaService.blog.findUnique).toHaveBeenCalledWith({
        where: { id: BlogArray[0].id },
      });
    });
  });

  describe('update by id', () => {
    it('should update blog by id', async () => {
      let updatedBlog = {
        id: 1,
        title: 'newTitle',
        content: 'best country',
        description: 'best in the world',
        category: Category.TECHNOLOGY,
        totalWord: 123,
        status: Status.Published,
        images: 'nepal.jpg',
        author: 'asim_neupane',
      };
      jest.spyOn(prismaService.blog, 'update').mockResolvedValue(updatedBlog);
      const result = await service.update(BlogArray[0].id, updatedBlog);
      console.log(result);
      expect(prismaService.blog.update).toHaveBeenCalledWith({
        where: { id: BlogArray[0].id },
        data: updatedBlog,
      });
    });
  });
  describe('delete by id', () => {
    it('should delete blog by id', async () => {
      jest.spyOn(prismaService.blog, 'delete').mockResolvedValue(undefined);
      const result = await service.deleteById(BlogArray[0].id);
      console.log(result);
      expect(prismaService.blog.delete).toHaveBeenCalledWith({
        where: { id: BlogArray[0].id },
      });
    });
  });
});
