import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { BcryptPass } from '../utils/Bcrypt';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { HttpException, HttpStatus } from '@nestjs/common';

const expectedResult = {
  id: 1,
  name: 'Asim Neupane',
  email: 'asimneupane11@gmail.com',
  password: 'hashPassword',
  isEmailVerified: true,
  isActive: true,
  isArchive: false,
  images: 'https://example.com/profile.jpg',
  roles: [Role.ADMIN],
  created_by: 2,
  updated_by: 2,
  Blogs: [],
};

const registerData = {
  name: 'Asim Neupane',
  email: 'asimneupane11@gmail.com',
  images: 'asimadmin.jpg',
  password: 'Helloworld@2',
};

describe('BlogService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              count: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        BcryptPass,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create a user directly', () => {
    it('should create a user', async () => {
      jest
        .spyOn(BcryptPass.prototype, 'hashPassword')
        .mockResolvedValue('hashPassword');
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(expectedResult);
      const result = await service.createUser(registerData);
      expect(result).toEqual(expectedResult);
      expect(BcryptPass.prototype.hashPassword).toHaveBeenCalledWith(
        registerData.password,
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...registerData,
          isEmailVerified: true,
          isActive: true,
          password: 'hashPassword',
        },
      });
    });
  });
  describe('getUser',()=>{
    it('should return a user',async()=>{
      
    })
  })
});
