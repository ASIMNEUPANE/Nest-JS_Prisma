import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller({path:'users', version:'1'}, )
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUser() {
    return this.userService.getUser();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
