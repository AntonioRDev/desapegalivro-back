import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getDonatedBooks(@Query('userId') userId: string, @Res() res: Response) {
        const books = await this.bookService.getBooks(userId);

        return res.status(HttpStatus.OK).json(books);
    }

    @Post('/donate')
    async donate(@Body() body: DonateBookRequestDto, @Res() res: Response) {
        try {
            const response = await this.bookService.donate(body);
            return res.status(HttpStatus.CREATED).json(response);
        } catch(error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
