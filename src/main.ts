import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000, () => {
    console.log("\x1b[34m Server is working on port: \x1b[0m", 4000)
  });
}
bootstrap();
