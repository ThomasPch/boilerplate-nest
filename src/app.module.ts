import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ArticlesModule } from './articles/articles.module';
import { ExceptionsLoggerFilter } from './common/utils/exceptionLogger.filter';


@Module({
  imports: [ArticlesModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: ExceptionsLoggerFilter,
  },
    AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        'cats/(.*)',
      )
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
  }
}

