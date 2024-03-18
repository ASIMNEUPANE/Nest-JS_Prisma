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

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller({ path: 'auths', version: '1' })
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  registerUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 100000 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateAuthDto,
  ) {
    const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];

    createUserDto.images = uniqueSuffix;
    console.log(createUserDto);

    return this.authsService.register(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.authsService.findAll();
  // }

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
