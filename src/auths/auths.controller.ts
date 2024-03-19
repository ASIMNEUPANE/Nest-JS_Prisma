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
import { CreateAuthDto, VerifyDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller({ path: 'auths', version: '1' })
@ApiTags('Auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreateUserDto],
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

  @Post('verify')
  verify(@Body() verifyDto: VerifyDto) {
    
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authsService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authsService.remove(+id);
  // }
}
