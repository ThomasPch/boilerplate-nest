import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter({ logger: true, http2: true })
    new FastifyAdapter({ logger: true })
  )
  app.useGlobalInterceptors(new LoggingInterceptor());
  const configService = app.get(ConfigService);

  // By default, Fastify listens only on the localhost 127.0.0.1 interface.
  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call
  await app.listen(configService.get('PORT'), '127.0.0.1');
}

bootstrap();      