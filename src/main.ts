import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PinoLogger } from './provider/logger';
import { AllExceptionsFilter } from './provider/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
    }),
    // { logger: new PinoLogger() },
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: (origin, cb) => {
      // permitir chamadas sem origin (tools, curl) ou comparar com env
      const allowed = [
        process.env.URL_FRONTEND,
        'https://www.redesenhe.com.br',
      ].filter(Boolean);
      if (!origin || allowed.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true,
  });
  app.setGlobalPrefix('/gateway');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0', () => {
    console.log(`🚀 Gateway is running on: ${process.env.PORT ?? 4000}`);
  });
}
bootstrap();
