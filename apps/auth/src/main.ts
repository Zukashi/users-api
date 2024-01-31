import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .addCookieAuth('Authentication', {
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useLogger(app.get(Logger));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
