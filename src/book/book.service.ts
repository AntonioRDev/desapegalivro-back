import { DonatedBook } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';
import { GetFilteredBooksDtoRequest } from './dto/get-filtered-books';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBooks(userId?: string) {
    let books: DonatedBook[] = [];

    if (userId) {
      books = await this.bookRepository.getBooksWithoutUserBooks(
        Number(userId),
      );
    } else {
      books = await this.bookRepository.getBooks();
    }

    return books;
  }

  async getById(userId: number) {
    return await this.bookRepository.getById(userId);
  }

  async getByUser(userId: number) {
    return await this.bookRepository.getByUser(userId);
  }

  async getFilteredBooks(filterParams: GetFilteredBooksDtoRequest) {
    return await this.bookRepository.getFilteredBooks(filterParams);
  }

  async toggleBookStatus(bookId: number) {
    return this.bookRepository.toggleBookStatus(bookId);
  }

  async donate(donateBookDto: DonateBookRequestDto) {
    return await this.bookRepository.donate(donateBookDto);
  }
}
