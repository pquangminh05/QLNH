import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // hoặc '*' nếu muốn mở rộng
    credentials: true, // nếu bạn dùng cookie, auth headers
  });
  await app.listen(3000);
}
bootstrap();
