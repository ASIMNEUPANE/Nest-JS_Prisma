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
  UseGuards,
  SetMetadata,
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
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuard } from 'src/auths/guards/role.guard';
import { Role } from './entities/role.enum';

@ApiBearerAuth('access-token')
@UseGuards(RoleGuard)
@Controller({ path: 'users', version: '1' })
@ApiTags('Users')
export class UserController {
  private logger = new Logger('User controller');
  constructor(private userService: UserService) {}

  // Creating user
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiCreatedResponse({ type: UserEntity })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Get all user
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiOkResponse({ type: UserEntity, isArray: true })
  getUsers() {
    return this.userService.getUser();
  }

  // Get user by id
  @Get(':id')
  @ApiOperation({ summary: 'Get an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  // Update user by id
  @Put(':id')
  @ApiOperation({ summary: 'Update  name and images of the user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateByIdDto: UpdateByIdDto,
  ) {
    return this.userService.updateById(id, updateByIdDto);
  }

  // change password by id
  @Put('change-password/:id')
  @ApiOperation({ summary: 'Update an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(
      id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  //Reset password by id
  @Put('reset-password/:id')
  @ApiOperation({ summary: 'Reset user Password' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.userService.resetPassword(id, resetPasswordDto);
  }

  // Block user by id
  @Put('block/:id')
  @ApiOperation({ summary: 'Block an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  blockUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() blockUserDto: BlockUserDto,
  ) {
    return this.userService.block(id, blockUserDto);
  }

  // Delete user by id
  @Put('archive/:id')
  @ApiOperation({ summary: 'Delete an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    return this.userService.archive(id, deleteUserDto);
  }
}
