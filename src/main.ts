import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { FastifyRequest } from 'fastify';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


require('dotenv').config();
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Swagger
  const options = new DocumentBuilder()
  .setTitle('Doc API Project demo')
  .setDescription('My doc API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .build();
  // Cấu hình CORS
  const corsOptions: CorsOptions = {
  // origin: ['http://example.com', 'https://example.com'], // Các domain có thể truy cập API của bạn
  origin: ['http://localhost:5173', 'http://127.0.0.1:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được cho phép
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  };
  app.enableCors(corsOptions); 

  //public
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  //version
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });



const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-docs', app, document);
  await app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
