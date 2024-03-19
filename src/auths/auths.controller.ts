import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthsService } from './auths.service';
import {
  CreateAuthDto,
  ForgetPassowrdDto,
  GenerateFPTokenDto,
  LogInReturnDto,
  LoginDto,
  ReturnTrueDto,
  VerifyDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthEntity } from './entities/auth.entity';

@Controller({ path: 'auths', version: '1' })
@ApiTags('Auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  // Register User
  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [AuthEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiCreatedResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('images', {}))
  registerUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 100000 }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateAuthDto,
  ) {
    if (file) {
      const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];

      createUserDto.images = uniqueSuffix;
    }

    console.log(createUserDto);

    return this.authsService.register(createUserDto);
  }

  // Verify User
  @Post('verify')
  @ApiOperation({ summary: 'Verify register user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [AuthEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  verify(@Body() verifyDto: VerifyDto) {
    return this.authsService.verify(verifyDto);
  }

  // regenerateToken
  @Post('regenerateToken')
  @ApiOperation({ summary: 'Verify register user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  regenerateToken(@Body() regenerateTokenDto: GenerateFPTokenDto) {
    return this.authsService.regenerateToken(regenerateTokenDto.email);
  }

  // LogIn User
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [LogInReturnDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  login(@Body() loginDto: LoginDto) {
    return this.authsService.login(loginDto.email, loginDto.password);
  }

  // generateFPToken
  @Post('generateFPToken')
  @ApiOperation({ summary: 'generateFPToken user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  generateFPToken(@Body() generateFPTokenDto: GenerateFPTokenDto) {
    return this.authsService.generateFPToken(generateFPTokenDto.email);
  }
  // Forget Password
  @Post('forget-passowrd')
  @ApiOperation({ summary: 'generateFPToken user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  forgetPassowrd(@Body() forgetPassowrdDto: ForgetPassowrdDto) {
    return this.authsService.forgetPassowrd(
      forgetPassowrdDto.email,
      forgetPassowrdDto.otp,
      forgetPassowrdDto.password,
    );
  }
}
