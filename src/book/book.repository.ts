import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks() {
    return await this.prisma.donatedBook.findMany({
      where: {
        AND: {
          isActive: {
            equals: true,
          },
          isDeleted: {
            equals: false,
          }
        }
      }
    });
  }

  async getBooksWithoutUserBooks(userId: number) {
    return await this.prisma.donatedBook.findMany({
      where: {
        AND: {
          userId: {
            not: userId,
          },
          isActive: {
            equals: true,
          },
          isDeleted: {
            equals: false,
          }
        }
      }
    });
  }

  async donate(donateBookDto: DonateBookRequestDto) {
    const {
      author,
      bookCoverUrl,
      categoryId,
      language,
      pagesQty,
      title,
      usageTime,
      userId,
    } = donateBookDto;

    const book = await this.prisma.donatedBook.create({
      data: {
        author,
        bookCoverUrl,
        categoryId,
        language,
        pagesQty,
        title,
        usageTime,
        userId,
        applicationsQty: 0,
      },
    });

    return book;
  }
}
