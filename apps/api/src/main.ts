import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // ─── Global prefix ──────────────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── CORS ───────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  // ─── Validation pipe ────────────────────────────────────────────────────────
  // Valida DTOs con class-validator y elimina propiedades no declaradas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // elimina campos no decorados
      forbidNonWhitelisted: true,
      transform: true,       // convierte tipos automáticamente
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Serialización ──────────────────────────────────────────────────────────
  // Respeta @Exclude() y @Expose() de class-transformer
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const port = config.get<number>('API_PORT') ?? 3001;
  await app.listen(port);
  console.log(`🚀 API corriendo en http://localhost:${port}/api`);
}

bootstrap();
