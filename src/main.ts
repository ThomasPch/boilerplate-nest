import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter({ logger: true, http2: true })
    new FastifyAdapter({ logger: true })
  )
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // By default, Fastify listens only on the localhost 127.0.0.1 interface.
  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call
  await app.listen(3000, '127.0.0.1');
}
bootstrap();