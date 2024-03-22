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
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, GetBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './entities/blog.entity';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RoleGuard } from 'src/auths/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

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
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [BlogEntity],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getBlogs(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Body() getBlogDto: GetBlogDto,
  ) {
    const { title, author } = getBlogDto;
    const search = { title, author };

    return this.blogService.findAll(limit, page, search);
  }
}
