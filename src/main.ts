import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  // SET GLOBAL PREFIX
  app.setGlobalPrefix('/api/v1')

  // USE MORGAN IN DEVELOPMENT MODE
  if(process.env.NODE_ENV?.trim() == 'development'){
    app.use(morgan('tiny'))
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`listening on ${configService.get<number>('appConfig.port')} port...`)
  });
}
bootstrap();
