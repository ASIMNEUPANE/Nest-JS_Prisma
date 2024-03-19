import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AuthEntity implements User {
  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
  
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  roles: Role;

  @ApiProperty()
  images: string;

  @ApiProperty()
  created_by: number;
  
  @ApiProperty()
  updated_by: number;

  // Additional properties
  @ApiProperty()
  isEmailVerified: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isArchive: boolean;
}
