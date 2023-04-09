import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAllExceptionsFilter, HttpExceptionFilter } from 'nest-common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {};

  const app = await NestFactory.create(AppModule, appOptions);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('api.port');
  const apiRootPath = configService.get<string>('api.rootPath');
  const apiSwaggerRootPath = configService.get<string>('api.swaggerRootPath');
  const origin = configService.get<string>('api.accessControlAllowOrigin');

  app.setGlobalPrefix(apiRootPath);

  if (origin) {
    app.enableCors({ origin });
  } else {
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(
    new HttpAllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  const options = new DocumentBuilder()
    .setTitle('Tic-Tac-Toe Game API')
    .setDescription('Tic-Tac-Toe Game')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiSwaggerRootPath, app, document);

  await app.listen(port);
}
bootstrap();
