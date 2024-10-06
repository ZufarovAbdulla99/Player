import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );

  // SET GLOBAL PREFIX
  app.setGlobalPrefix('/api/v1');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MP3 Player API')
    .setDescription('MP3 Player API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // USE MORGAN IN DEVELOPMENT MODE
  if (process.env.NODE_ENV?.trim() == 'development') {
    app.use(morgan('tiny'));
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(
      `listening on ${configService.get<number>('appConfig.port')} port...`,
    );
  });
}
bootstrap();
