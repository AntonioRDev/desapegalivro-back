import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { DonateBookRequestDto } from './dto/donate-book-request.dto';
import { GetFilteredBooksDtoRequest } from './dto/get-filtered-books';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(bookId: number) {
    return await this.prisma.donatedBook.findUnique({
      where: {
        id: bookId
      },
      include: {
        user: {
          include: {
            address: true
          }
        },
        category: true
      }
    })
  }

  async getByUser(userId: number) {
    return await this.prisma.donatedBook.findMany({
      where: {
        userId: userId
      },
      include: {
        user: {
          include: {
            address: true
          }
        },
        category: true
      }
    })
  }

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
      },
      include: {
        user: {
          include: {
            address: true
          }
        },
        category: true
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

  async getFilteredBooks(filterParams: GetFilteredBooksDtoRequest) {
    const params = {
      isActive: {
        equals: true,
      },
      isDeleted: {
        equals: false,
      }
    };

    if(filterParams.userId) {
      params['userId'] = { not: filterParams.userId };
    }

    if(filterParams.bookName) {
      params['title'] = { contains: filterParams.bookName };
    }

    if(filterParams.city) {
      params['user'] = {
        address: {
          city: {
            equals: filterParams.city
          }
        }
      }
    }

    if(filterParams.state) {
      params['user'] = {
        address: {
          state: {
            equals: filterParams.state
          }
        }
      }
    }

    return await this.prisma.donatedBook.findMany({
      where: {
        AND: params
      },
      include: {
        user: true
      }
    });
  }

  async toggleBookStatus(bookId: number) {
    const donationBook = await this.getById(bookId);

    return await this.prisma.donatedBook.update({
      where: {
        id: donationBook.id
      },
      data: {
        isActive: !donationBook.isActive
      }
    })
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