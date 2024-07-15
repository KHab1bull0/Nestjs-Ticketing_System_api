import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000, () => {
    console.log("\x1b[34m Server is working on port: \x1b[0m", 4000)
  });
}
bootstrap();
