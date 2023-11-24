import ArticlesController from './articles.controller';
import ArticlesService from './services/articles.service';
import { Module } from '@nestjs/common';
import Article from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule { }