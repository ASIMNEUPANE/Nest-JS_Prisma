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
  Logger,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import {
  UpdateUserDto,
  UpdateByIdDto,
  ChangePasswordDto,
  ResetPasswordDto,
  BlockUserDto,
  DeleteUserDto,
} from './dtos/update-user.dto';
import { IsStrongPassword } from 'class-validator';

@Controller({ path: 'users', version: '1' })
export class UserController {
  private logger = new Logger('User controller');
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  getUsers() {
    return this.userService.getUser();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser();
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateByIdDto: UpdateByIdDto,
  ) {
    return this.userService.updateById(id, updateByIdDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(
      id,
      changePasswordDto.Oldpassword,
      changePasswordDto.NewPassword,
    );
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.userService.resetPassword(id, resetPasswordDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  blockUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() blockUserDto: BlockUserDto,
  ) {
    return this.userService.block(id, blockUserDto);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    return this.userService.archive(id, deleteUserDto);
  }
}
