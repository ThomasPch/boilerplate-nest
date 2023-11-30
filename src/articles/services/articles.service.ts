import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UpdateArticleDto } from '../dto/updateArticle.dto';
import { CreateArticleDto } from '../dto/createArticle.dto';
import ArticleEntity from '../article.entity';

@Injectable()
export default class ArticlesService {
    constructor (
        @InjectRepository(ArticleEntity)
        private articlesRepository: Repository<ArticleEntity>
    ) { }

    async getAllArticles() {
        return this.articlesRepository.find();
    }

    async getArticleById(id: number) {
        const article = this.articlesRepository.findOne({ where: { id: id } });
        if (article) {
            return article;
        }
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    async updateArticle(id: number, article: UpdateArticleDto) {
        await this.articlesRepository.update(id, article);
        const updatedArticle = await this.articlesRepository.findOne({ where: { id: id } });
        if (updatedArticle) {
            return updatedArticle
        }
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    async createArticle(article: CreateArticleDto) {
        const newArticle = await this.articlesRepository.create(article);
        await this.articlesRepository.save(newArticle);
        return newArticle;
    }

    async deleteArticle(id: number) {
        const deleteResponse = await this.articlesRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
    }
}