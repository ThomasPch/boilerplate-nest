import ArticlesController from './articles.controller';
import ArticlesService from './services/articles.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule { }