import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import ArticlesService from './services/articles.service';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { CreateArticleDto } from './dto/createArticle.dto';

@Controller('articles')
export default class ArticlesController {
    constructor (
        private readonly articlesService: ArticlesService
    ) { }

    @Get()
    getAllArticles() {
        return this.articlesService.getAllArticles();
    }

    @Get(':id')
    getArticleById(@Param('id') id: string) {
        return this.articlesService.getArticleById(Number(id));
    }

    @Post()
    async createArticle(@Body() post: CreateArticleDto) {
        return this.articlesService.createArticle(post);
    }

    @Put(':id')
    async replaceArticle(@Param('id') id: string, @Body() post: UpdateArticleDto) {
        return this.articlesService.replaceArticle(Number(id), post);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        this.articlesService.deleteArticle(Number(id));
    }
}