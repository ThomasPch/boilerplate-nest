import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import ArticlesService from './services/articles.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { FastifyReply } from 'fastify';


@Controller('articles')
export default class ArticlesController {
    constructor (
        private readonly articlesService: ArticlesService
    ) { }

    @Get(':id')
    async getAllArticles(@Req() request: Request, @Res() response: FastifyReply, @Param('id') id: string) {
        try {
            const post = await this.articlesService.getArticleById(Number(id));
            response.send(post);
        } catch (error) {
            response.send(error);
        }
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
    async updateArticle(@Param('id') id: string, @Body() post: UpdateArticleDto) {
        return this.articlesService.updateArticle(Number(id), post);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        this.articlesService.deleteArticle(Number(id));
    }
}