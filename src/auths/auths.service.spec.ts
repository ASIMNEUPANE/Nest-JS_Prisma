import { Test, TestingModule } from '@nestjs/testing';
import { AuthsService } from './auths.service';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptPass } from '../utils/Bcrypt';
import { Role } from '@prisma/client';
import * as OTP from '../utils/otp';
import * as mail from '../utils/mailer';

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
const authData = {
  email: registerData.email,
  otp: '123456',
};
describe('AuthsService', () => {
  let service: AuthsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthsService,
        {
          provide: PrismaService,
          useValue: {
            auth: {
              create: jest.fn(),
              count: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            user: {
              create: jest.fn(),
            },
          },
        },
        BcryptPass,
      ],
    }).compile();

    service = module.get<AuthsService>(AuthsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register user', () => {
    it('should register new user and give otp', async () => {
      jest
        .spyOn(BcryptPass.prototype, 'hashPassword')
        .mockResolvedValue('hashPassword');

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(expectedResult);
      jest.spyOn(OTP, 'generateOTP').mockReturnValue('123456' as never);
      jest.spyOn(prismaService.auth, 'create').mockResolvedValue({
        id: 1,
        email: 'asimneupane11@gmail.com',
        otp: '123456',
      });
      jest.spyOn(mail, 'mailer').mockResolvedValue('email@succesjiahdabidna');
      const result = await service.register(registerData);
      expect(result).toEqual(expectedResult);
      expect(BcryptPass.prototype.hashPassword).toHaveBeenCalledWith(
        registerData.password,
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { ...registerData, password: 'hashPassword' },
      });
      expect(OTP.generateOTP).toHaveBeenCalled();
      expect(prismaService.auth.create).toHaveBeenCalledWith({
        data: { ...authData },
      });
      expect(mail.mailer).toHaveBeenCalledWith(
        'asimneupane11@gmail.com',
        '123456',
      );
    });
  });
});
