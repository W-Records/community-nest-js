import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用 CORS，允许特定来源（如你的前端地址）
  app.enableCors({
    origin: 'http://localhost:5173', // 允许的前端域名
    credentials: true, // 允许携带凭证（如 Cookie）
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
