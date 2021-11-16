import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';
import { GetFilteredBooksDtoRequest } from './dto/get-filtered-books';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getDonatedBooks(@Query('userId') userId: string, @Res() res: Response) {
        const books = await this.bookService.getBooks(userId);

        return res.status(HttpStatus.OK).json(books);
    }

    @Get('/:id')
    async getById(@Param('id') id: string, @Res() res: Response) {
        const book = await this.bookService.getById(Number(id));

        return res.status(HttpStatus.OK).json(book);
    }

    @Get('/user/:id')
    async getByUser(@Param('id') id: string, @Res() res: Response) {
        const books = await this.bookService.getByUser(Number(id));

        return res.status(HttpStatus.OK).json(books);
    }

    @Put('/:bookId/toggleStatus')
    async toggleStatus(@Param('bookId') bookId: string, @Res() res: Response) {
        const updatedBook = await this.bookService.toggleBookStatus(Number(bookId));

        return res.status(HttpStatus.OK).json(updatedBook);
    }

    @Post('/filter')
    async getFilteredBooks(@Body() body: GetFilteredBooksDtoRequest, @Res() res: Response) {
        const filteredBooks = await this.bookService.getFilteredBooks(body);

        return res.status(HttpStatus.OK).json(filteredBooks);
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