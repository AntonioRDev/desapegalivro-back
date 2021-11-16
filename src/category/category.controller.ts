import { Controller, Res, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAll(@Res() res: Response) {
        const categories = await this.categoryService.getAll();

        return res.status(HttpStatus.OK).json(categories);
    }
}
