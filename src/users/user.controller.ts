import { Controller, Get, Post,Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller()
export class UserController {
  constructor(private userService:UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto:CreateUserDto){
    return this.userService.createUser(createUserDto)
  }
}
