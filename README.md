Things to do

Feature List:

Project Setup using @nestjs/fastify(Fast and low overhead web framework, with a powerful plugin architecture, inspired by Hapi and Express)
Logging using @nestjs/commom logger
Swagger documentation using @nestjs/swagger with Authorization
Enabled dotenv support on Approot using @nestjs/config
API Versioning(/api/v1 , api/v2){default: /api/v1}
Enable RBAC
Added Docker Support
Create global custom exception filter to catch global errors
Enable User Authentication
Added Mailing SMTP service for Mailing using Nodemailer with handlebars for email templates
Prisma Integration
Integration Testing / Unit Testing using Jest [With Test DB Environment]


Verioning
VERSON_NEUTURAL belongs to every version








  // Register User
  // @Post('register')
  // @ApiOperation({ summary: 'Create new user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: [AuthEntity],
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @UseInterceptors(
  //   FileInterceptor('images', {
  //     storage: diskStorage({
  //       destination: './public/user',
  //       filename: (req, file, cb) => {
  //         // Generating a unique filename
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const extension = file.originalname.split('.').pop();
  //         cb(null, `${uniqueSuffix}.${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // registerUser(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: 'image/jpeg' }),
  //         new MaxFileSizeValidator({ maxSize: 100000 }),
  //       ],
  //       fileIsRequired: false,
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Body() createUserDto: CreateAuthDto,
  // ) {
  //   if (file) {
  //     const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];

  //     createUserDto.images = uniqueSuffix;
  //   }

  //   console.log(createUserDto);

  //   return this.authsService.register(createUserDto);
  // }
