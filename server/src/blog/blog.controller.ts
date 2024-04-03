import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  Request,
  Get,
  Query,
  ParseIntPipe,
  Param,
  Put,
  Delete,
  DefaultValuePipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, GetBlogDto } from './dto/create-blog.dto';
import { BlogEntity, DeleteEntity } from './entities/blog.entity';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RoleGuard } from 'src/auths/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IsOptional } from 'class-validator';

@ApiBearerAuth('access-token')
@UseGuards(RoleGuard)
@Controller('blogs')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create new Blog' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [BlogEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: '/public/blog',
        filename: (req, file, cb) => {
          // Generating a unique filename
          const uniqueSuffix =
            'blog' + Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  registerUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1000000 }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
    @Request() req: any,
  ) { 
    if (file) {
      const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];

      createBlogDto.images = uniqueSuffix;
    }
    createBlogDto.author = req.currentUserName;

    console.log(createBlogDto);

    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of all blog' })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [BlogEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getBlogs(
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number = 4,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Body() getBlogDto: GetBlogDto,
  ) {
    const { title, author } = getBlogDto;
    const search = { title, author };

    return this.blogService.findAll(limit, page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog ' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [BlogEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get a blog ' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [BlogEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './public/blog',
        filename: (req, file, cb) => {
          // Generating a unique filename
          const uniqueSuffix =
            'blog' + Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  updateBYId(
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req: any,
  ) {
    if (file) {
      const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];

      updateBlogDto.images = uniqueSuffix;
    }

    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog ' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [DeleteEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.deleteById(id);
  }
}
