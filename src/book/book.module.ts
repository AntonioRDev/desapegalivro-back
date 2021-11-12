import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Module } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
