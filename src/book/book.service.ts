import { DonatedBook } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBooks(userId?: string) {
      let books: DonatedBook[] = [];

      if(userId) {
         books = await this.bookRepository.getBooksWithoutUserBooks(Number(userId));
      } else {
        books = await this.bookRepository.getBooks();
      }

      return books;
  }

  async donate(donateBookDto: DonateBookRequestDto) {
    return await this.bookRepository.donate(donateBookDto);
  }
}
