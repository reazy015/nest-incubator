import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new BadRequestException({
          errorMessages: errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints)[0],
          })),
        });
      },
    }),
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
