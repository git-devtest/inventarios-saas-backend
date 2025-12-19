import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Inventarios SaaS API')
    .setDescription('API para gestionar inventarios de productos')
    .setVersion('1.0')
    .addTag('Inventarios')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
    },
  });

  // Filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interceptor global para transformar respuestas
  app.useGlobalInterceptors(new TransformInterceptor());

  // Validación Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();